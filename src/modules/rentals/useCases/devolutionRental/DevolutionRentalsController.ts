import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalsUseCase } from "./DevolutionRentalsUseCase";

class DevolutionRentalController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { id: user_id } = request.user;
        const { id } = request.params;

        const devolutionRentalUseCase = container.resolve(DevolutionRentalsUseCase);

        const rental = devolutionRentalUseCase.execute({
            id,
            user_id
        });

        return response.status(200).json(rental);
    }
}

export { DevolutionRentalController };