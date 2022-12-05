import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationCategoriesRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({ description, name }: ISpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });

        this.specifications.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((specification) => specification.name === name);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) => {
            return ids.includes(specification.id);
        });

        return allSpecifications;
    }
}

export { SpecificationRepositoryInMemory };