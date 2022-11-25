const jwt = require("jsonwebtoken");
const ErrorResponse = require('./ErrorResponse');

exports.validateUser = (token) => {
    /*
    * here type id staff/student & token is jwt token
    */
    if (token == null) {
        return { message: "error", data: `unauthorized, please provide a valid jwt token` };
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err, response) => {
        if (err) {
            return { message: "error", data: `token expired or invalid token, please try again with valid jwt token` };
        }
        return { message: "ok", data: response }
    })
}