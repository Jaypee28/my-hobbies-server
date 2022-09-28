import { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register } from "./controller/auth";
import { UpdatePassword, UpdateProfile, AddHobbies, UpdateHobbies, getHobbiesDetails, getUserHobbies, sortHobbiesASC, sortHobbiesDESC } from "./controller/user";
import { AuthMiddleware } from "./middleware/auth";

export const routes = (router: Router) => {
    
    router.post('/api/register', Register);

    router.post('/api/login', Login);

    router.get('/api/user', AuthMiddleware, AuthenticatedUser);

    router.post('/api/logout', AuthMiddleware, Logout);

    router.put('/api/user/profile', AuthMiddleware, UpdateProfile);

    router.get('/api/user/profile', AuthMiddleware, getUserHobbies);

    router.put('/api/user/password', AuthMiddleware, UpdatePassword);

    router.post('/api/user/hobbies', AuthMiddleware, AddHobbies);

    router.put('/api/user/hobbies/:id', AuthMiddleware, UpdateHobbies);

    router.get('/api/user/hobbies/:id', AuthMiddleware, getHobbiesDetails);

    router.get('/api/hobbies/sort/asc', AuthMiddleware, sortHobbiesASC);

    router.get('/api/hobbies/sort/desc', AuthMiddleware, sortHobbiesDESC);
}