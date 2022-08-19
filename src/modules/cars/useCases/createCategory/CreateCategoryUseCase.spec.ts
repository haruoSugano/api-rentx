import { AppError } from "@errors/AppError";

import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it("should be able to create a new category", async () => {
        const catetory = {
            name: "Category Test",
            description: "Category description Test",
        };

        await createCategoryUseCase.execute({
            name: catetory.name,
            description: catetory.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(catetory.name);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with name exists", async () => {
        expect(async () => {
            const catetory = {
                name: "Category Test",
                description: "Category description Test",
            };
    
            await createCategoryUseCase.execute({
                name: catetory.name,
                description: catetory.description,
            });
    
            await createCategoryUseCase.execute({
                name: catetory.name,
                description: catetory.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})