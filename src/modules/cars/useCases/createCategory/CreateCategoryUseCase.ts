import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository){}

    async execute({ name, description }: IRequest):Promise<void> {

        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category Already exists! ");
        }

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };