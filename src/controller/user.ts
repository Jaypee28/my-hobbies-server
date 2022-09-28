import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entity/User";
import { Hobby } from "../entity/Hobby";

export const UpdateProfile = async (req: Request, res: Response) => {
    const user = req["user"];

    const repository = AppDataSource.getRepository(User);

    await repository.update(user.id, req.body);

    const {password, ...data} = await repository.findOne({
        where:{
            id: user.id
        }
    });

    res.send(data);
}

export const UpdatePassword = async (req: Request, res: Response) => {
    const user = req["user"];

    if(req.body.password !== req.body.password_confirm){
        return res.status(400).send({
            message: 'Password do not match'
        });
    }

     await AppDataSource.createQueryBuilder().update(User).set({
        password: await bcrypt.hash(req.body.password, 0)
     }).where("id = :id", { id: user.id }).execute();

    const {password, ...data} = user;

    res.send(data);
}

export const AddHobbies = async (req: Request, res: Response) => {
    const body = req.body;

    const user = req["user"];

    const repository = AppDataSource.getRepository(Hobby);

    const { ...hobby } = await repository.save({
        name: body.name,
        description: body.description,
        img: body.img,
        user: user.id
    });

    res.send(hobby); 
}

export const UpdateHobbies = async (req: Request, res: Response) => {
    const paramsID: number = parseInt(req.params.id);

    const repository = AppDataSource.getRepository(Hobby);

    const id = await repository.findOne({
        where: {
            id: paramsID
    }});

    await repository.update(id, req.body);

    const {...data} = await repository.find({
        where:{
            id: paramsID
        }
    });

    res.send(data);
}

export const getHobbiesDetails = async (req: Request, res: Response) => {
    const paramsID: number = parseInt(req.params.id);

    const repository = AppDataSource.getRepository(Hobby);

    const { ...data } = await repository.findOne({
        where: {
            id: paramsID
        }
    });

    res.send(data);
}

export const getUserHobbies = async (req: Request, res: Response) => {
    const user = req["user"];

    const repository = AppDataSource.getRepository(Hobby);
    const data = await repository.find({
        where: {
            user: user,
            deleted: false
        }
    })
    res.send(data);
    
}

export const sortHobbiesASC = async (req: Request, res: Response) => {
    const user = req["user"];

    const repository = AppDataSource.getRepository(Hobby);
    const data = await repository.find({
        order: {
            name: "ASC"
        },
        where: {
            user: user,
            deleted: false
        }
    })
    res.send(data);
    
}

export const sortHobbiesDESC = async (req: Request, res: Response) => {
    const user = req["user"];

    const repository = AppDataSource.getRepository(Hobby);
    const data = await repository.find({
        order: {
            name: "DESC"
        },
        where: {
            user: user
        }
    })
    res.send(data);
    
}