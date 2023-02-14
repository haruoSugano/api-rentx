"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationRepositoryInMemory = void 0;
var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");
class SpecificationRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }
  async create({
    description,
    name
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      description,
      name
    });
    this.specifications.push(specification);
    return specification;
  }
  async findByName(name) {
    return this.specifications.find(specification => specification.name === name);
  }
  async findByIds(ids) {
    const allSpecifications = this.specifications.filter(specification => {
      return ids.includes(specification.id);
    });
    return allSpecifications;
  }
}
exports.SpecificationRepositoryInMemory = SpecificationRepositoryInMemory;