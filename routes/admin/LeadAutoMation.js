const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const express = require("express");
const router = express.Router();
const LeadAndEnquiry = require('../../models/leadAndEnquiry/index.js')
const Followup = require('../../models/followup.js')
const Batch = require('../../models/batch.js')
const Course = require('../../models/course.js')
const Center = require('../../models/center.js')


const CLIENT_ID = process.env.CLIENT_ID_GOOGLE;
const CLIENT_SECRET = process.env.CLIENT_SECRET_GOOGLE;
const REDIRECT_URI = process.env.REDIRECT_URI_GOOGLE;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_GOOGLE;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

router.route("/").post(async (req, res) => {
  console.log("stage 1");
  try {
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    await oAuth2Client.refreshAccessToken();
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    console.log("stage 2");
    const res = await gmail.users.messages.list({ userId: 'me', maxResults: 1 });
    let { id } = res.data.messages[0];
    const response = await gmail.users.messages.get({ userId: 'me', id, });
    const parts = response.data.payload.parts.reduce((acc, part) => {
      if (part.parts) {
        return [...acc, ...part.parts];
      }
      return [...acc, part];
    }, []);
    console.log("stage 3", parts);
    const body = parts?.filter(part => part.mimeType === 'text/plain')[0]?.body?.data;
    if (!body) {
      return res.status(200).json({ success: false, error: 'No body found' });
    }
    const decodedBody = Buffer.from(body, 'base64').toString().split('\n').reduce((acc, line) => {
      line = line.trim().split(':');
      if (line.length == 2) {
        const [key, value] = line;
        return { ...acc, [key.trim()]: (key.trim() == 'date') ? new Date(value.trim()) : value.trim() };
      }
      return acc;
    }, { isLead : true, currentStatus: "lead", isEnquiry : false});
    console.log("stage 4", decodedBody);
    if (decodedBody['batch'] != undefined) {
      let { _id } =  await Batch.findOne({ batch_name : { $regex : decodedBody['batch'] }})
        .select({ _id : true });
      if (_id != undefined)
        decodedBody['batch'] = _id;
    }
    if (decodedBody['courses'] != undefined) {
      let cid = decodedBody['courses'].split(",");
      cid = await Course.find({ $or : cid.map(course_id => ({ course_id })), academic_year : "master"}).select({ _id : true });
      decodedBody['courses'] = cid.map(({ _id }) => _id);
    }
    if (decodedBody['center'] != undefined) {
      let temp = await Center.findOne({ name : { $regex : decodedBody['center'] }});
      if (temp != undefined) {
        decodedBody['center'] = temp._id;
      }
    }
    if (!decodedBody['mobile'] || !decodedBody['name'] || !decodedBody['data'] )
      return res.status(200).json({ success: true });
    const result = await LeadAndEnquiry.create(decodedBody);
    console.log("stage 5", result);
    await Followup.create({
      followup_type : "lead",
      connection_id : result._id,
      followup_list : [{
        date : new Date(),
        addedTime : new Date(),
        comment : decodedBody['comment'] || "",
        status : decodedBody['status'] || "HOT",
      }]
    })
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("stage 6", error);
    return res.status(200).json({ success: false, error });
  }
});

module.exports = router;