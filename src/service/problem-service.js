const { StatusCodes } = require("http-status-codes");
const { problemRepository } = require("../repo");
const AppError = require("../utils/errors/app-error");

const ProblemRepo = new problemRepository();

const createProblem = async (data) => {
  try {
    const { title, description, testCases, difficulty } = data;

    const problem = await ProblemRepo.create({
      title: title,
      description: description,
      difficulty: difficulty,
      testCases: testCases ? testCases : [],
    });

    return problem;
  } catch (error) {
    throw new AppError(
      "Cannot create a new tweet",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createProblem,
};
