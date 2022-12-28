const express = require("express");
const router = express.Router();
const { PermissionAuthenctication } = require("../../middleware/apiAuth.js");

const {
    GetAllRolls, UpdateRoll
} = require("../../controllers/permission/index.js");

router.route("/").get(GetAllRolls);
router.route("/:id").put(PermissionAuthenctication, UpdateRoll);

module.exports = router;