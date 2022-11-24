const jwt = require("jsonwebtoken");
const ErrorResponse = require('./ErrorResponse');

exports.validateUser = (token) => {
    /*
    * here type id staff/student & token is jwt token
    */
    if (token == null) {
        throw new ErrorResponse(`unauthorized, please provide a valid jwt token`, 401);
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err, response) => {
        if (err) {
            throw new ErrorResponse(`token expired or invalid token, please try again with valid jwt token`, 403);
        }
        return { message: "ok", data: response }
    })
}