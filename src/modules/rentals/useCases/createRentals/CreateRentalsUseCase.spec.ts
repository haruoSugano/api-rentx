import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalsUseCase } from "./CreateRentalsUseCase";

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalsUseCase = new CreateRentalsUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalsUseCase.execute({
            user_id: "12345",
            car_id: "12121212",
            expected_return_date: dayAdd24hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {

        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "12345",
                car_id: "12121212",
                expected_return_date: dayAdd24hours,
            });

            const rental = await createRentalsUseCase.execute({
                user_id: "12345",
                car_id: "12121212",
                expected_return_date: dayAdd24hours,
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {

        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "12354",
                car_id: "12121212",
                expected_return_date: dayAdd24hours,
            });

            const rental = await createRentalsUseCase.execute({
                user_id: "12345",
                car_id: "12121212",
                expected_return_date: dayAdd24hours,
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create a new rental with invalid return time", async () => {

        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "12354",
                car_id: "12121212",
                expected_return_date: dayjs().toDate(),
            });

        }).rejects.toBeInstanceOf(AppError)
    });
});