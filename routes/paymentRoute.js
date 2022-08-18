const express = require("express");

const paymentController = require("./../controller/paymeController");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
router.route("/").post();
module.exports = router;
