import { Application, Request, Response } from "express";
import { User, UserStore } from "../models/users";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../middlewares/authenticator";

const userStore = new UserStore();

const userRoutes = (app: Application) => {
    app.get("/users", verifyAuthToken, index);
    app.get("/users/:id", verifyAuthToken, show);
    app.post("/users", create);
};
const index = async (_req: Request, res: Response) => {
    const users = await userStore.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    const user = await userStore.show(+(req.params.id as string));
    res.json(user);
};

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        };
        const newUser = await userStore.create(user);
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
};

export default userRoutes;
