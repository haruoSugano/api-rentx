import { inject, injectable } from "tsyringe";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
    refresh_token: string;
    user: {
        name: string;
        email: string;
    },
}

@injectable()
class AuthenticateUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: DayjsDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        const { 
            secret_token, 
            secret_refresh_token, 
            expires_in_token, 
            expires_in_refresh_token,
            expires_refresh_token_days
         } = auth;

        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });

        const refresh_token_expires_date = this.dayjsDateProvider.addDays(
            expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            user_id: user.id,
            expires_date: refresh_token_expires_date,
            refresh_token: refresh_token,
        });

        const tokenReturn: IResponse = {
            token,
            refresh_token,
            user: {
                name: user.name,
                email: user.email
            }
        };

        return tokenReturn;
    }
}

export { AuthenticateUseCase }