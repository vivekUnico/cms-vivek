const express = require("express");
const router = express.Router();

// Controller
const { CreateTicket, ReadTicket, DeleteTicket, ReadSingleTicket, UpdateTicket } = require('../../controllers/adminSupport/asTicket');
const { CreateComment, DeleteComment, ReadComment, UpdateComment } = require('../../controllers/adminSupport/asTicketComment');
const { CreateResolution, DeleteResolution, ReadResolution, UpdateResolution } = require('../../controllers/adminSupport/asTicketResolution');

const { CreateInfastructure, DeleteInfastructure, ReadInfastructure, ReadSingleInfastructure, UpdateInfastructure } = require('../../controllers/adminSupport/asInfastructure');
const { CreateVendors, DeleteVendors, ReadSingleVendors, ReadVendors, UpdateVendors } = require('../../controllers/adminSupport/asVendors');
const { CreatePhysicalMaterials, DeletePhysicalMaterials, ReadPhysicalMaterials, ReadSinglePhysicalMaterials, UpdatePhysicalMaterials } = require('../../controllers/adminSupport/asPhysicalMaterials');
const { GetAllContacts } = require('../../controllers/adminSupport/asContacts');


/*
* Ticket Route
*/
router.route('/ticket').post(CreateTicket);
router.route('/ticket').get(ReadTicket);
router.route('/ticket/single/:id').get(ReadSingleTicket);
router.route('/ticket/:id').delete(DeleteTicket);
router.route('/ticket/:id').put(UpdateTicket);

router.route('/ticket/comment').post(CreateComment);
router.route('/ticket/comment/:id').get(ReadComment);
router.route('/ticket/comment/:id').delete(DeleteComment);
router.route('/ticket/comment/:id').put(UpdateComment);

router.route('/ticket/resolution').post(CreateResolution);
router.route('/ticket/resolution/:id').get(ReadResolution);
router.route('/ticket/resolution/:id').delete(DeleteResolution);
router.route('/ticket/resolution/:id').put(UpdateResolution);


/*
* Infastructure Route
*/
router.route('/infastructure').post(CreateInfastructure);
router.route('/infastructure').get(ReadInfastructure);
router.route('/infastructure/single/:id').get(ReadSingleInfastructure);
router.route('/infastructure/:id').delete(DeleteInfastructure);
router.route('/infastructure/:id').put(UpdateInfastructure);


/*
* Vendors Route
*/
router.route('/vendor').post(CreateVendors);
router.route('/vendor').get(ReadVendors);
router.route('/vendor/single/:id').get(ReadSingleVendors);
router.route('/vendor/:id').delete(DeleteVendors);
router.route('/vendor/:id').put(UpdateVendors);


/*
* Physical Matertial Route
*/
router.route('/physicalmaterial').post(CreatePhysicalMaterials);
router.route('/physicalmaterial').get(ReadPhysicalMaterials);
router.route('/physicalmaterial/single/:id').get(ReadSinglePhysicalMaterials);
router.route('/physicalmaterial/:id').delete(DeletePhysicalMaterials);
router.route('/physicalmaterial/:id').put(UpdatePhysicalMaterials);


/*
* Contact Route
*/
router.route('/contact').get(GetAllContacts);



module.exports = router;