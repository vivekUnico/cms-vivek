const jwt = require("jsonwebtoken");
const axios = require('axios');

require('dotenv').config()

let API_KEY = process.env.ZOOM_API_KEY;
let API_SECRET = process.env.ZOOM_API_SECRET;

const payload = {
    iss: API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const tokenMain = jwt.sign(payload, API_SECRET);

async function createZoomMeeting({ hostemail, topic, duration, password, agenda }, settings) {
    try {
        const token = tokenMain;
        const email = hostemail;
        const result = await axios.post("https://api.zoom.us/v2/users/" + email + "/meetings", {
            "topic": topic,
            "type": 2,
            "start_time": ((new Date()).getTime() + 5000),
            "duration": duration,
            "timezone": "India",
            "password": password && "1234567",
            "agenda": agenda,
            "settings": settings && {
                "host_video": true,
                "participant_video": true,
                "cn_meeting": false,
                "in_meeting": true,
                "join_before_host": false,
                "mute_upon_entry": false,
                "watermark": false,
                "use_pmi": false,
                "approval_type": 2,
                "audio": "both",
                "auto_recording": "local",
                "enforce_login": false,
                "registrants_email_notification": false,
                "waiting_room": true,
                "allow_multiple_devices": true
            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        });
        return result.data
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        } else {
            return error.response

        }
    }
}

async function updateMeeting({ meetingid, topic, duration, password, agenda }, settings) {
    try {
        const token = tokenMain;
        const meetingId = meetingid;
        const result = await axios.patch("https://api.zoom.us/v2/meetings/" + meetingId, {
            "topic": topic,
            "type": 2,
            "start_time": ((new Date()).getTime() + 5000),
            "duration": duration,
            "timezone": "India",
            "password": password && "1234567",
            "agenda": agenda,
            "settings": settings && {
                "host_video": true,
                "participant_video": true,
                "cn_meeting": false,
                "in_meeting": true,
                "join_before_host": false,
                "mute_upon_entry": false,
                "watermark": false,
                "use_pmi": false,
                "approval_type": 2,
                "audio": "both",
                "auto_recording": "local",
                "enforce_login": false,
                "registrants_email_notification": false,
                "waiting_room": true,
                "allow_multiple_devices": true
            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        });
        return result.data
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        } else {
            return error.response
        }
    }
}

async function deleteMeeting(meetingid) {
    try {
        const token = tokenMain;
        const meetingId = meetingid;
        const result = await axios.delete("https://api.zoom.us/v2/meetings/" + meetingId, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        });
        return result.data
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        } else {
            return error.response
        }
    }
}
module.exports = { createZoomMeeting, deleteMeeting, updateMeeting }


