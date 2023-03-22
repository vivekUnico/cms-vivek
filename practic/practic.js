// const CLIENT_ID = `383926281252-0f87fot0bj5jm2oa65hg4s8avtrpgmue.apps.googleusercontent.com`;
// const CLIENT_SECRET = `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`;
// const REDIRECT_URI = 'https://google.com';
// const { google } = require('googleapis');
// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
// const gmailCode = `4/0AWtgzh5eYivYotTt8AJXzY1hO4xhY_14WXbOTgIhljtPfIGSkbZRyP_utM2kNAjD_8ATlg`;

// // const getNewTokens = async () => {
// //   const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// //   try {
// //     const { tokens } = await oauth2Client.getToken(gmailCode);
// //     console.log('Tokens retrieved successfully', tokens);
// //     return tokens;
// //   } catch (error) {
// //     console.error('Error exchanging authorization code:', error);
// //     throw new Error('Error exchanging authorization code');
// //   }
// // }

// // getNewTokens();
// const ACCESS_TOKEN = `ya29.a0AVvZVsoyOQ3tNJnYIXz4gUIazRsFigNaylsZgRrUP1JhL5VJBx_uPJCLNyRg0KbxcCo0pJroFSeWs3KUiw8STUVah_XrTCF8a34_4aSY-hPyQcXmqFAmxC3trVAG4vUJW_ZMHxOx2ZpSwbMQTE7RtpKzZtsTaCgYKAZcSARESFQGbdwaIP5EMAPOpuSg9ZdW1K_pEWQ0163`
// const REFRESH_TOKEN = `1//0gOwD8R-jAaRmCgYIARAAGBASNwF-L9IrWJ6no-kBDdRzFXMy8Y3sp56Z2RFxe_fz3mxVvui5Mf7h-fRnBDt9Kp2nUqAj7A8YQmQ`;

// const connectDB = require("../config/db");
// const GmailCredentials = require("../models/GmailCredentials");
// const { OAuth2Client } = require('google-auth-library');

// const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// // Set the access token for the authenticated user
// oAuth2Client.setCredentials({
// 	access_token: ACCESS_TOKEN,
// 	refresh_token: REFRESH_TOKEN,
// });

// // Set up the Gmail API client
// const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

// gmail.users.watch(
// 	{
// 		userId: 'me',
// 		resource: {
// 			topicName: 'projects/cms-001-380807/topics/topic1',
// 			labelIds: ['INBOX'],
// 			payload: true,
// 		},
// 		callbackUrl: 'http://localhost:3000/gmail-webhook',
// 	}, (err, response) => {
// 		if (err) {
// 			console.error(`Error subscribing to Gmail notifications:`, err);
// 			return;
// 		}
// 		console.log(`Subscribed to Gmail notifications:`, response);
// 	}
// );

// const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';

// function generateString(l, r) {
//     let result = '', length = Math.floor(Math.random() * r) + l;
//     const charactersLength = characters.length;
//     for ( let i = 0; i < length; i++ ) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// function randomNUmber(l, r) {
// 	return Math.floor(Math.random() * (r - l + 1)) + l;
// }


// const LeadAndEnquiry = require("../models/LeadAndEnquiry");
// const Followup = require("../models/Followup");

// const confifDB = require("../config/db"), Arr = ['HOT', 'WARM', 'COLD', 'REJECTED'], lst = ['English', 'Hindi', 'Other'];

// function randomDate(start, end) {
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }

// confifDB().then(async () => {
// 	for (let i = 1; i <= 500; i += 1) {
// 		const result = await LeadAndEnquiry.create({
// 			name : generateString(5, 15),
// 			gender : randomNUmber(0, 1) == 0 ? "female" : "male",
// 			mobile : randomNUmber(1000000000, 9999999999),
// 			email : generateString(10, 15) + "@gmail.com",
// 			created_by : "63aef76005f9c2538b7d621b",
// 			status : Arr[randomNUmber(0, 3)],
// 			center : `63298dd027e32b6c45239f1d`,
// 			isLead : false,
// 			date : randomDate(new Date(2020, 0, 1), new Date()),
// 			isEnquiry : true,
// 			comment : generateString(10, 15),
// 			currentStatus : 'enquiry',
// 			medium : lst[randomNUmber(0, 2)],
// 		});
// 		await Followup.create({
// 			followup_type: "enquiry",
// 			connection_id : result._id,
// 			followup_list : [{
// 				date : randomDate(new Date(2020, 0, 1), new Date()),
// 				comment : generateString(10, 15),
// 				created_by : "63aef76005f9c2538b7d621b",
// 				status : Arr[randomNUmber(0, 3)],
// 				addedTime : new Date(),
// 				completed : false,
// 			}]
// 		});
// 	}
// });

const Permission = require("../models/Permissions.js");
const ObjectId = require("mongoose").Types.ObjectId;

const confifDB = require("../config/db");
confifDB().then(async () => {
	await Permission.insertMany([
		{ roll_name : "admin", parents : [ ObjectId("63ac76389a9a5346cb442ae6"), ObjectId('63ac76389a9a5346cb442ae8') ], derived : true },
		{ roll_name : "manager", parents :[ ObjectId("63ac76389a9a5346cb442ae7"), ObjectId('63ac76389a9a5346cb442ae8')], derived : true },
		{ roll_name : "operations", parents :[ ObjectId("63ac76389a9a5346cb442ae9"), ObjectId('63ac76389a9a5346cb442ae8')], derived : true },
		{ roll_name : "sales", parents : [ObjectId("63ac76389a9a5346cb442aea"), ObjectId('63ac76389a9a5346cb442ae8')], derived : true },
		{ roll_name : "accountant", parents :[ ObjectId("63ac76389a9a5346cb442aeb"), ObjectId('63ac76389a9a5346cb442ae8')], derived : true },
		{ roll_name : "marketing", parents :[ ObjectId("63ac76389a9a5346cb442aec"), ObjectId('63ac76389a9a5346cb442ae8')], derived : true },
	]);
});