const express = require("express");
const router = express.Router();

const { CreateBatch, GetAllBatch, UpdateBatch, DeleteBatch, GetSingleBatch } = require("../../controllers/batch");

router.route('/').get(GetAllBatch)
router.route('/').post(CreateBatch)

router.route('/:id').get(GetSingleBatch)
router.route('/:id').put(UpdateBatch)
router.route('/:id').delete(DeleteBatch)


module.exports = router;