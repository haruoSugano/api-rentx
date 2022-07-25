import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";
import { Category } from "../model/Category";

class PostgressCategoriesRepository implements ICategoriesRepository{
    findByName(name: string): Category {
        console.log(name);
        throw new Error("Method not implemented.");
    }
    list(): Category[] {
        return null;
    }
    create({ name, description }: ICreateCategoryDTO): void {
        console.log(name, description);
    }
}

export { PostgressCategoriesRepository };