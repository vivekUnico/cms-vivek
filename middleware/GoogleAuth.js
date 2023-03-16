const { google } = require('googleapis');
const GmailCredentials = require("../models/GmailCredentials");

const CLIENT_ID = precess.env.CLIENT_ID_GOOGLE;
const CLIENT_SECRET = precess.env.CLIENT_SECRET_GOOGLE;
const REDIRECT_URI = precess.env.REDIRECT_URI_GOOGLE;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// function to get new access token
const getAccessToken = async (req, res) => {
  try {
    const { tokens } = await oauth2Client.refreshAccessToken();
    return tokens;
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}

const getNewTokens = async (gmailCode) => {
  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  try {
    const { tokens } = await oauth2Client.getToken(gmailCode);
    return tokens;
  } catch (error) {
    throw new Error('Error exchanging authorization code');
  }
}

const GoogleAuth = async (req, res, next) => {
  let { ACCESS_TOKEN, REFRESH_TOKEN, gmailCode } = await GmailCredentials.findOne();
  try {
    oauth2Client.setCredentials({
      access_token: ACCESS_TOKEN,
      refresh_token: REFRESH_TOKEN,
    });
    const { expiry_date } = oauth2Client.credentials;
    if (Date.now() >= expiry_date) {
      const newTokens = await getAccessToken(req, res);
      ACCESS_TOKEN = newTokens.access_token;
      REFRESH_TOKEN = newTokens.refresh_token;
    }
  } catch (error) {
    const newTokens = await getNewTokens(gmailCode);
    ACCESS_TOKEN = newTokens.access_token;
    REFRESH_TOKEN = newTokens.refresh_token;
  }
  req.oauth2Client = {
    ACCESS_TOKEN, REFRESH_TOKEN, oauth2Client
  };
  next();
}

module.exports = GoogleAuth;