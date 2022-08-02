import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";
import { Category } from "../entities/Category";
import { Repository } from "typeorm";

class PostgresCategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name
        });

        await this.repository.save(category);
    }
}

export { PostgresCategoriesRepository };