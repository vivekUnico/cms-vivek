const jwt = require("jsonwebtoken");
const ErrorResponse = require('../utils/ErrorResponse');

//Models
const Staff = require("../models/staff");
const Permissions = require("../models/Permissions");

/*
* Main JWT Auth 
*/
exports.ApiAuthentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        throw new ErrorResponse(`unauthorized, please provide a valid jwt token`, 401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, response) => {
        if (err) {
            throw new ErrorResponse(`token expired or invalid token, please try again with valid jwt token`, 403);
        }
        req.user = response;
        next();
    })
}

/*
* Admin Auth 
*/
exports.AdminAuthenctication = async (req, res, next) => {
    const user = req.user;
    const userData = await Staff.findOne({ _id: user?.userid });
    if (userData?.role === 'admin') {
        req.id = Staff.userid;
        next();
    } else {
        return res.status(401).json({ success: false, data: "unauthorized user" })
    }
}

/*
* Manager Auth 
*/
exports.ManagerAuthenctication = async (req, res, next) => {
    const user = req.user;
    const userData = await Staff.findOne({ _id: user?.userid });
    if (userData?.role === 'manager') {
        req.id = Staff.userid;
        next();
    } else {
        return res.status(401).json({ success: false, data: "unauthorized user" })
    }
}

/*
* Executive Auth 
*/
exports.ExecutiveAuthenctication = async (req, res, next) => {
    const user = req.user;
    const userData = await Staff.findOne({ _id: user?.userid });
    if (userData?.role === 'executive') {
        req.id = Staff.userid;
        next();
    } else {
        return res.status(401).json({ success: false, data: "unauthorized user" })
    }
}

/*
* Customer Auth 
*/
exports.CutomerAuthenctication = async (req, res, next) => {
    const user = req.user;
    const userData = await Staff.findOne({ _id: user?.userid });
    if (userData?.role === 'customer') {
        req.id = Staff.userid;
        next();
    } else {
        return res.status(401).json({ success: false, data: "unauthorized user" })
    }
}

exports.PermissionAuthenctication = async (headers, temp) => {
    try {
        let authHeader = headers['authorization'], user;
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            throw new ErrorResponse(`unauthorized, please provide a valid jwt token`, 401);
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, response) => {
            if (err) {
                throw new ErrorResponse(`token expired or invalid token, please try again with valid jwt token`, 403);
            }
            user = response;
        });
        let { permission_id } = user;
        let result = await Permissions.findOne({ _id: permission_id });
        if (!result[`${temp}`]) {
            return { success: false, message : "you have not permission to access this Route" };
        }
        return { success: true, message : "you have permission to access this Route" };
    } catch (error) {
        return { success: false, message : error.message };
    }
}