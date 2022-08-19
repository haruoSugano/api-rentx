import fs from 'fs';
import { parse } from 'csv-parse';

import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            // O que faz a leitura do arquivo
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = parse();

            stream.pipe(parseFile);// pipe será responsável por pegar o pedaço lido

            //Lendo cada linha de um arquivo
            parseFile.on("data", async (line) => {
                // ["name", "description"]
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            }).on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", (error) => {
                reject(error);
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        
        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = await this.categoriesRepository.findByName(name);

            if(!existCategory) {
                await this.categoriesRepository.create({
                    name,
                    description
                });
            }
        });
    }
}

export { ImportCategoryUseCase };