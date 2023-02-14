"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostgresCategoriesRepository = void 0;
class PostgresCategoriesRepository {
  constructor() {
    this.repository = void 0;
  }
  async findByName(name) {
    const category = await this.repository.findOne({
      name
    });
    return category;
  }
  async list() {
    const categories = await this.repository.find();
    return categories;
  }
  async create({
    name,
    description
  }) {
    const category = this.repository.create({
      description,
      name
    });
    await this.repository.save(category);
  }
}
exports.PostgresCategoriesRepository = PostgresCategoriesRepository;