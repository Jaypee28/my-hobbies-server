import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppDataSource } from "../config/db";
import { User } from "../entity/User";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies["jwt"];

        const payload: any = verify(jwt, process.env.SECRET_KEY);

        if(!payload){
            return res.status(401).send({
                message: "Unauthenticated"
            });
        }

        const repository = AppDataSource.getRepository(User);

        req["user"] = await repository.findOne({ 
            where: {
                id: payload.id
            }    
        });

        next();
    } catch (error) {
        return res.status(401).send({
            message: "Unauthenticated"
        });
    }
}