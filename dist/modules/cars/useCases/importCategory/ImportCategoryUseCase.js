"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryUseCase = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _csvParse = require("csv-parse");
var _tsyringe = require("tsyringe");
var _ICategoriesRepository = require("@modules/cars/repositories/ICategoriesRepository");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ImportCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ImportCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  loadCategories(file) {
    return new Promise((resolve, reject) => {
      // O que faz a leitura do arquivo
      const stream = _fs.default.createReadStream(file.path);
      const categories = [];
      const parseFile = (0, _csvParse.parse)();
      stream.pipe(parseFile); // pipe será responsável por pegar o pedaço lido

      //Lendo cada linha de um arquivo
      parseFile.on("data", async line => {
        // ["name", "description"]
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      }).on("end", () => {
        _fs.default.promises.unlink(file.path);
        resolve(categories);
      }).on("error", error => {
        reject(error);
      });
    });
  }
  async execute(file) {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const {
        name,
        description
      } = category;
      const existCategory = await this.categoriesRepository.findByName(name);
      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }
}) || _class) || _class) || _class) || _class);
exports.ImportCategoryUseCase = ImportCategoryUseCase;