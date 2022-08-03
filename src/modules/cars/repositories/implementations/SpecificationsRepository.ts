import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository, ISpecificationDTO } from "../ISpecificationCategoriesRepository";

class SpecificationRepository implements ISpecificationsRepository{
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ description, name }: ISpecificationDTO): Promise<void> {
        
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);
    }

    async findByName(name: string) : Promise<Specification> {
        const specification = this.repository.findOne({
            name,
        });
        return specification;
    }
}

export { SpecificationRepository };