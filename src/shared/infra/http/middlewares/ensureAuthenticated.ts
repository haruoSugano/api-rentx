import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";


interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    const userTokensRepository = new UsersTokensRepository();


    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }
    //Bearer token...
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        request.user = {
            id: user_id
        }

        next();
    } catch {
        throw new AppError("Invalide token!", 401);
    }
}