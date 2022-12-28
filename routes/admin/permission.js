const express = require("express");
const router = express.Router();
const { PermissionAuthenctication } = require("../../middleware/apiAuth.js");

const {
    GetAllRolls, UpdateRoll
} = require("../../controllers/permission/index.js");

router.route("/").get(GetAllRolls).put(UpdateRoll);

module.exports = router;