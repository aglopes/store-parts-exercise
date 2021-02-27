const express = require("express");
const router = express.Router();
const path = require('path');
const queryContent = require("../utils/query-content");
const storeParts = require("../mock-data/parts");
const partsPerType = require("../mock-data/parts-per-type");
const partTypes = require("../mock-data/part-types");

//simple just throwing index.html for routes...
router.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
	res.sendFile(path.join(__dirname,'../app/index.html'));
});

router.get("/part", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
	res.sendFile(path.join(__dirname,'../app/index.html'));
});

router.get("/about", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
	res.sendFile(path.join(__dirname,'../app/index.html'));
});

module.exports = router;
