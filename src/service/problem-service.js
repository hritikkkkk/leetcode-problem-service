const { StatusCodes } = require("http-status-codes");
const { problemRepository } = require("../repo");
const AppError = require("../utils/errors/app-error");
const sanitizeMarkdownContent = require("../utils/helper/sanitizer");

const ProblemRepo = new problemRepository();

const createProblem = async (data) => {
  try {
    const { title, description, testCases, difficulty } = data;
    sanitizeMarkdownContent(description);
    const problem = await ProblemRepo.create({
      title: title,
      description: description,
      difficulty: difficulty,
      testCases: testCases ? testCases : [],
    });

    return problem;
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const validationErrors = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      const Error = {
        message: "Problem validation failed",
        errors: validationErrors,
      };
      throw Error;
    }

    throw new AppError(
      "Cannot create a new Problem",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateProblem = async (problemId, data) => {
  try {
    const prob = await ProblemRepo.getOne(problemId);
    if (!prob) throw new AppError("Problem not found", StatusCodes.NOT_FOUND);

    const { title, description, testCases, difficulty } = data;
    sanitizeMarkdownContent(description);
    const problem = await ProblemRepo.update(problemId, {
      title: title,
      description: description,
      difficulty: difficulty,
      testCases: testCases ? testCases : [],
    });

    return problem;
  } catch (error) {
    console.log(error);
    if (error.name === "CastError")
      throw new AppError("Invalid problem ID format", StatusCodes.BAD_REQUEST);

    if (error.name === "ValidationError") {
      const validationErrors = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      const Error = {
        message: "Problem validation failed",
        errors: validationErrors,
      };
      throw Error;
    }

    throw new AppError(
      "Cannot create a new Problem",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteProblem = async (id) => {
  try {
    const problem = await ProblemRepo.destroy(id);
    return problem;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The tweet you requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "cannot fetch the data of given tweet",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getProblem = async (id) => {
  try {
    const problem = await ProblemRepo.getOne(id);

    if (!problem)
      throw new AppError(
        "The problem you requested to is not present",
        StatusCodes.NOT_FOUND
      );
    return problem;
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The problem you requested to is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "cannot fetch the data of given Problem",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllProblems = async (offset, limit) => {
  try {
    return await ProblemRepo.getAllProblems(offset, limit);
  } catch (error) {
    throw new AppError(
      "cannot fetch the data of tweets",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblem,
  getAllProblems,
};
