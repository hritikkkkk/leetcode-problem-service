const express = require("express");

const ProblemRoutes = require("./problem-routes");
const router = express.Router();

router.use("/problems", ProblemRoutes);

module.exports = router;
