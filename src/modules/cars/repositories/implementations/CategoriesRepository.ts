import { Category } from '../../model/Category';
// repositories será responsável por realizar a inserção no banco de dados

// DTO => Data transfer object
interface ICreateCategoryDTO {
    name: string;
    description: string;
}
// singleton

class CategoriesRepository {
    private categories: Category[];
    //Criando um instancia(singleton)
    private static INSTANCE: CategoriesRepository;

    constructor() {
        this.categories = [];
    }

    // Será responsável por instanciar a nossas classes ja existentes
    public static getInstance(): CategoriesRepository{

        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }

    create({ description, name } : ICreateCategoryDTO): void {
        const category = new Category();
        // Forma melhor
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });
        // 
        /* category.name = name;
        category.description = description;
        category.created_at = new Date(); */

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(category => category.name === name);
        return category;
    }
}

export { CategoriesRepository };