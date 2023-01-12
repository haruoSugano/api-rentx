import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";


interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
<<<<<<< HEAD
=======
    findByUserId(user_id: string): Promise<Rental[]>;
>>>>>>> 9485083a521cece85fe09e2a3ee27811870bc1c9
    create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };