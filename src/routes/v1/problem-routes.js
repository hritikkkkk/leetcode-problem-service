const express = require("express");
const { ProblemController } = require("../../controller");

const router = express.Router();

router.post("/", ProblemController.addProblem);

module.exports = router;
