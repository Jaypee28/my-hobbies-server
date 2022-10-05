import { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register } from "./controller/auth";
import { UpdatePassword, UpdateProfile, AddHobby, UpdateHobby, GetHobbyDetails, GetUserHobbies, SortHobbiesASC, SortHobbiesDESC, DeleteHobby } from "./controller/user";
import { AuthMiddleware } from "./middleware/auth";

export const routes = (router: Router) => {
    
    router.post('/api/register', Register);

    router.post('/api/login', Login);

    router.get('/api/user', AuthMiddleware, AuthenticatedUser);

    router.post('/api/logout', AuthMiddleware, Logout);

    router.put('/api/user/profile', AuthMiddleware, UpdateProfile);

    router.get('/api/hobbies', AuthMiddleware, GetUserHobbies);

    router.put('/api/user/password', AuthMiddleware, UpdatePassword);

    router.post('/api/hobby', AuthMiddleware, AddHobby);

    router.put('/api/hobby/:id', AuthMiddleware, UpdateHobby);

    router.put('/api/hobby/del/:id', AuthMiddleware, DeleteHobby);

    router.get('/api/hobby/:id', AuthMiddleware, GetHobbyDetails);

    router.get('/api/hobbies/sort/asc', AuthMiddleware, SortHobbiesASC);

    router.get('/api/hobbies/sort/desc', AuthMiddleware, SortHobbiesDESC);
}