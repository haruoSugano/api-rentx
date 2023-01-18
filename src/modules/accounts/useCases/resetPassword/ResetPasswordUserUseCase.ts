import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: UsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider,
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) { }
    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(token);

        if (!userToken) {
            throw new AppError("Token invalid.");
        }

        if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
            throw new AppError("Token expired.");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase }
