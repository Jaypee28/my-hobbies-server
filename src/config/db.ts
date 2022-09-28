import "reflect-metadata";
import { DataSource } from "typeorm";
import { Hobby } from "../entity/Hobby";
import { User } from "../entity/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "hobbies",
    entities: [
        User,
        Hobby
    ],
    logging: false,
    synchronize: true
});
