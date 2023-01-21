const express = require("express");
const router = express.Router();

const { GetAllEmi, CreateEmi, GetSingleEmi, DeleteEmi, 
        UpdateEmi, AppendEMI, Update_emi_list, RemoveEMI } = require("../../../controllers/emi");
const {
    GetManualEmi, CreateManualEmi, deleteManualEmi, UpdateManualEmi
} = require("../../../controllers/emi/manualEmi.js");

`/admin/emi/manual/:id`

router.route('/').get(GetAllEmi)
router.route('/').post(CreateEmi)

router.route('/:id').get(GetSingleEmi)
router.route('/:id').put(UpdateEmi)
router.route('/:id').delete(DeleteEmi)

router.route('/emi_list/:id').post(AppendEMI);
router.route('/emi_list/:id').put(Update_emi_list);
router.route('/emi_list/:id').delete(RemoveEMI);

router.route('/manual/:id').get(GetManualEmi).delete(deleteManualEmi);
router.route('/manual').post(CreateManualEmi);
router.route('/manual/:id').put(UpdateManualEmi);


module.exports = router;