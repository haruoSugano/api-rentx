import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalsUseCase } from "./CreateRentalsUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
    const dayAdd24hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalsUseCase = new CreateRentalsUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "123456",
            brand: "brand"
        });

        const rental = await createRentalsUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "987",
            expected_return_date: dayAdd24hours,
            user_id: "12345",
        });

        await expect(createRentalsUseCase.execute({
            user_id: "12345",
            car_id: "12121212",
            expected_return_date: dayAdd24hours,
        })
        ).rejects.toEqual(new AppError("There's a rental in progress for use!"));
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            expected_return_date: dayAdd24hours,
            user_id: "123456",
        });

        await expect(
            createRentalsUseCase.execute({
                user_id: "789",
                car_id: "test",
                expected_return_date: dayAdd24hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("should not be able to create a new rental with invalid return time", async () => {

        await expect(createRentalsUseCase.execute({
                user_id: "12354",
                car_id: "12121212",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalide return time!"))
    });
});