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
        const openByCar = await this.repository.findOne({
            where: { car_id, end_date: null},
        });
        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({
            where: { user_id, end_date: null},
        });
        return openByUser;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);

        return rental;
    }

<<<<<<< HEAD
=======
    async findByUserId(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car"]
        });

        return rentals;
    }

>>>>>>> 9485083a521cece85fe09e2a3ee27811870bc1c9
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