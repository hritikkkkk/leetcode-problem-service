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

module.exports = {
  createProblem,
};
