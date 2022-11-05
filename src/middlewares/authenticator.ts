import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET as string;
const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(" ")[1];
            jwt.verify(token, secret);
            next();
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        res.status(401);
        res.send("Invalid auth token");
    }
};

export default verifyAuthToken;
