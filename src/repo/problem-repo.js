const CrudRepository = require("./crud-repo");
const Problem = require("../model/problem-model");

class problemRepository extends CrudRepository {
  constructor() {
    super(Problem);
  }
}

module.exports = problemRepository;
