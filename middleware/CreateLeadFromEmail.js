const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const Course = require('../models/course.js')
const Center = require('../models/center.js')
const Batch = require('../models/batch.js')
const LeadAndEnquiry = require('../models/leadAndEnquiry/index.js')
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), './middleware/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), './middleware/credentials.json');
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return { Promise<OAuth2Client|null> }
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) { 
    return null; 
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function Authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return listLabels(client);
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return listLabels(client);
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * 1//0gP3TNtHU_TzpCgYIARAAGBASNwF-L9IrsZ99n9aDFsKOasGzQGg8NmXjDnIXOoiE4n6HowtTZ9nlGWV1EDL9bLrHjknik45MIsg
 * ya29.a0AVvZVsr-HzZbEdwxVLOH4Qt9yByALIZIrz17fKa6zYi3X0Ofo_v-dMkpl5U-JBBtG6R9mGD9IJVzsv4qbj5WyahHAtX-Tb4kQbfkQV-NczpnxmWjgkzzQfpaVV3xNyjTlIupZ-Zu-EPnuFJzX61TLC3p7_2BHSMaCgYKAXISAQASFQGbdwaIe_mx-yQNx2v2KVcYiSc0EQ0166
 */

async function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth}), temp = new Date();
	const result = await gmail.users.messages.list({
		userId: 'me',
	});
	for (let message of result.data.messages) {
    const messageData = await gmail.users.messages.get({userId: 'me', id: message.id, format : 'full'});
    const parts = messageData.data.payload.parts;
    const body = parts?.filter(part => part.mimeType === 'text/plain')[0]?.body?.data;
		let date = new Date(parseInt(messageData.data.internalDate));
    let breakPoint = Math.abs(temp.getTime() - date.getTime()) / 1000, importent = ["name", "mobile", "date", "courses_id"];
    let allList = [ ...importent, "email", "city", "source", "medium", "comment", "batch", "gender", "center"]
    if (breakPoint > 35) return ;
		if (body) {
			const decodedBody = Buffer.from(body, 'base64').toString();
      let obj = decodedBody.split("\r\n").filter((item) => item?.includes(":"))
        .reduce((acc, item) => {
          let [key, value] = item.split(":");
          if (acc[key.trim()] == undefined)
            acc[key.trim()] = value.trim().split(" ")[0];
          return acc;
        }, {});

      let apiObj = {
        isLead : true,
        currentStatus: "lead",
        isEnquiry : false,

      }
      for (let key in obj) {
        if (!allList.includes(key)) return;
        if (key == "courses_id") {
          let cid = obj[key].split(",");
          cid = await Course.find({ $or : cid.map(course_id => ({ course_id })), academic_year : "master"}).select({ _id : true });
          apiObj["courses"] = cid?.map(item => item._id || item);
        } else if (key == "batch") {
          apiObj["batch"] = await Batch.findOne({ batch_name : {
            $regex : obj[key]
          } }).select({ _id : true });
          apiObj["batch"] = apiObj["batch"]?._id;
        } else if (key == "center") {
          apiObj["center"] = await Center.findOne({ center_name : {
            $regex : obj[key]
          } }).select({ _id : true });
        } else if (key == "date") {
          apiObj["date"] = new Date(obj[key]).toISOString();
        } else apiObj[key] = obj[key];
      }
      console.log("new lead will be created", apiObj);
      if (!apiObj["courses"] || !apiObj["date"] || !apiObj["name"] || !apiObj["mobile"]) return ;
      let result = await LeadAndEnquiry.create(apiObj).catch(err => console.log(err));
      console.log("created, lead", result);
		}
  }
}

module.exports = Authorize;