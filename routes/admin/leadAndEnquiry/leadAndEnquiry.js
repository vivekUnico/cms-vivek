const express = require("express");
const router = express.Router();

const { CreateLeadAndEnquiry, GetAllLeadAndEnquiry, GetSingleLeadAndEnquiry, DeleteLeadAndEnquiry, UpdateLead, 
        GetLeadAndEnquiryByFilter,  UpdateEnquiry, MoveLeadToEnquiry } = require("../../../controllers/leadAndEnquiry");

router.route('/').get(GetAllLeadAndEnquiry)
router.route('/').post(CreateLeadAndEnquiry)
router.route('/filter').get(GetLeadAndEnquiryByFilter);

router.route('/:id').get(GetSingleLeadAndEnquiry)
router.route('/:id').delete(DeleteLeadAndEnquiry)

router.route('/lead-to-enquiry/:id').post(MoveLeadToEnquiry);
router.route('/update-lead/:id').put(UpdateLead);
router.route('/update-enquiry/:id').put(UpdateEnquiry);


module.exports = router;