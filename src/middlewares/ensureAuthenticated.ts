import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("Token missing");
    }
    //Bearer token...
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "5ac01b841f4be6870f99888c532b413f"
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new Error("User does not exists!");
        }

        next();
    } catch {
        throw new Error("Invalide token!");
    }
}