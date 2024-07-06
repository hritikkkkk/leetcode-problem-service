const { ProblemService } = require("../service");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const addProblem = async (req, res) => {
  try {
    const problem = await ProblemService.createProblem(req.body);
    SuccessResponse.data = problem;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    if (error.message === "Problem validation failed") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
        errors: error.errors,
      });
    }
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const updateProblem = async (req, res) => {
  try {
    const problemId = req.params.id;
    const problem = await ProblemService.updateProblem(problemId, req.body);
    SuccessResponse.data = problem;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    if (error.message === "Problem validation failed") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
        errors: error.errors,
      });
    }
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  addProblem,
  updateProblem,
};
