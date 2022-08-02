import { Specification } from "../entities/Specification";
import { ICreateCategoryDTO } from "./ICategoriesRepository";

interface ISpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    create({ description, name } : ICreateCategoryDTO) : void;
    findByName(name: string): Specification;
}

export{ ISpecificationsRepository, ISpecificationDTO };