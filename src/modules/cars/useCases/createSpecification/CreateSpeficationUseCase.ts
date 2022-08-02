import { inject, injectable } from "tsyringe";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationCategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationsRepository) { }
        
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = this.specificationRepository.findByName(name);

        if(specificationAlreadyExists){
            throw new Error("Specification already exists!");
        }
        this.specificationRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };