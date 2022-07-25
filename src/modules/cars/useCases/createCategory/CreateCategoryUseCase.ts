import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

// SOLID sendo aplicado
// DIP -> Dependency Inversion Principle(Principio de inversão de Dependência)
/**
 * Definir o tipo de retorno
 * Alterar o retorno de erro
 * Acessar o repositorio
 * Retornar algo
 */
class CreateCategoryUseCase {
    //private categoriesRepository: CategoriesRepository; em vez disso

    constructor( private categoriesRepository: CategoriesRepository){}
    execute({ description, name }: IRequest):void {

        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category Already exists! ");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };