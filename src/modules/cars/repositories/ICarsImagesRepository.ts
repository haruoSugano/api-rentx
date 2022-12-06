import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
    create(car_id: string, images_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository };