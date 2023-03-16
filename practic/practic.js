const CLIENT_ID = `383926281252-0f87fot0bj5jm2oa65hg4s8avtrpgmue.apps.googleusercontent.com`;
const CLIENT_SECRET = `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`;
const REDIRECT_URI = 'https://google.com';
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
const gmailCode = `4/0AWtgzh5eYivYotTt8AJXzY1hO4xhY_14WXbOTgIhljtPfIGSkbZRyP_utM2kNAjD_8ATlg`;

// const getNewTokens = async () => {
//   const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
//   try {
//     const { tokens } = await oauth2Client.getToken(gmailCode);
//     console.log('Tokens retrieved successfully', tokens);
//     return tokens;
//   } catch (error) {
//     console.error('Error exchanging authorization code:', error);
//     throw new Error('Error exchanging authorization code');
//   }
// }

// getNewTokens();
const ACCESS_TOKEN = `ya29.a0AVvZVsoyOQ3tNJnYIXz4gUIazRsFigNaylsZgRrUP1JhL5VJBx_uPJCLNyRg0KbxcCo0pJroFSeWs3KUiw8STUVah_XrTCF8a34_4aSY-hPyQcXmqFAmxC3trVAG4vUJW_ZMHxOx2ZpSwbMQTE7RtpKzZtsTaCgYKAZcSARESFQGbdwaIP5EMAPOpuSg9ZdW1K_pEWQ0163`
const REFRESH_TOKEN = `1//0gOwD8R-jAaRmCgYIARAAGBASNwF-L9IrWJ6no-kBDdRzFXMy8Y3sp56Z2RFxe_fz3mxVvui5Mf7h-fRnBDt9Kp2nUqAj7A8YQmQ`;

const connectDB = require("../config/db");
const GmailCredentials = require("../models/GmailCredentials");
const { OAuth2Client } = require('google-auth-library');

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Set the access token for the authenticated user
oAuth2Client.setCredentials({
	access_token: ACCESS_TOKEN,
	refresh_token: REFRESH_TOKEN,
});

// Set up the Gmail API client
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

gmail.users.watch(
	{
		userId: 'me',
		resource: {
			topicName: 'projects/cms-001-380807/topics/topic1',
			labelIds: ['INBOX'],
			payload: true,
		},
		callbackUrl: 'http://localhost:3000/gmail-webhook',
	}, (err, response) => {
		if (err) {
			console.error(`Error subscribing to Gmail notifications:`, err);
			return;
		}
		console.log(`Subscribed to Gmail notifications:`, response);
	}
);