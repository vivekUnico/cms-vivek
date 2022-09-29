const express = require("express");
const router = express.Router();

const { GetAllEmi, CreateEmi, GetSingleEmi, DeleteEmi, UpdateEmi } = require("../../../controllers/emi");

router.route('/').get(GetAllEmi)
router.route('/').post(CreateEmi)

router.route('/:id').get(GetSingleEmi)
router.route('/:id').put(UpdateEmi)
router.route('/:id').delete(DeleteEmi)



module.exports = router;