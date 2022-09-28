import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { AppDataSource } from "./config/db";
 
AppDataSource.initialize().then(() => {
    
    const app = express();
    // Parse URL encoded bodies
    app.use(express.urlencoded({ extended: false }));
    // Parse JSON bodies
    app.use(express.json());
    app.use(cookieParser());
    
    app.use(cors({
        credentials: true,
        origin: ['http://localhost:3000']
    }));
    
    routes(app);
    
    app.listen(5000, () => {
        console.log('Server started...');
    });
    console.log("Database Connected");

});
