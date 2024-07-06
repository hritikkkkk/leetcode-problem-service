const express = require("express");
const { ProblemController } = require("../../controller");

const router = express.Router();

router.post("/", ProblemController.addProblem);

router.put("/:id", ProblemController.updateProblem);

module.exports = router;
