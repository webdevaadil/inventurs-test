const express = require("express");
const router = express.Router();
const {  Addnewtransition, Gettransition, DeleteGettransition} = require("../controllers/auth.js");
router.route("/transactions").post(Addnewtransition)
router.route("/transactionss").post(Gettransition)
router.route("/transactions/:id").delete(DeleteGettransition)


module.exports = router;
