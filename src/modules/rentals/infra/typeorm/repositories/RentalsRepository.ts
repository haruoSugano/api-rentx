import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({ car_id });
        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({ user_id });
        return openByUser;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);

        return rental;
    }

    async create({ user_id, car_id, expected_return_date, total, id, end_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            user_id, 
            car_id, 
            expected_return_date, 
            total,
            id, 
            end_date
        });

        await this.repository.save(rental);

        return rental;
    }
}

export { RentalsRepository };