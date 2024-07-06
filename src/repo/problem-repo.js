const CrudRepository = require("./crud-repo");
const Problem = require("../model/problem-model");

class problemRepository extends CrudRepository {
  constructor() {
    super(Problem);
  }
  async getAllProblems(offset, limit) {
    return await Problem.find().skip(offset).limit(limit);
  }
}

module.exports = problemRepository;
