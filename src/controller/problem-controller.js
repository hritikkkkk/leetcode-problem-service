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

const deleteProblem = async (req, res) => {
  try {
    const problem = await ProblemService.deleteProblem(req.params.id);
    SuccessResponse.data = problem;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getProblem = async (req, res) => {
  try {
    const problem = await ProblemService.getProblem(req.params.id);
    SuccessResponse.data = problem;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error)
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problem = await ProblemService.getAllProblems({
      offset: req.params.offset,
      limit: req.params.limit,
    });
    SuccessResponse.data = problem;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  addProblem,
  updateProblem,
  deleteProblem,
  getProblem,
  getAllProblems,
};
