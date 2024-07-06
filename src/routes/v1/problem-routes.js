const express = require("express");
const { ProblemController } = require("../../controller");

const router = express.Router();

router.post("/", ProblemController.addProblem);

router.put("/:id", ProblemController.updateProblem);

router.delete("/:id", ProblemController.deleteProblem);

router.get("/:id", ProblemController.getProblem);

router.get("/", ProblemController.getAllProblems);

module.exports = router;
