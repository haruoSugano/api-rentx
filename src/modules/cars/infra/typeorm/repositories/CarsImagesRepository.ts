import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(car_id: string, images_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            images_name
        });

        await this.repository.save(carImage);

        return carImage;
    }

}

export { CarsImagesRepository };