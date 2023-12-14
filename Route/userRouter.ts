import express, { Request, Response } from "express";
const userRouter = express.Router();

const users = [
    { name: "Tun", email: "tun@gmail.com", age: 20 },
    { name: "Aung", email: "aung@gmail.com", age: 26 },
    { name: "Kyaw", email: "kyaw@gmail.com", age: 28 },
];

userRouter.use(express.json());

userRouter
    .route("/")
    .get((req: Request, res: Response) => {
        res.send(users);
    })
    .post((req: Request, res: Response) => {
        console.log(req.body);
        res.send(users);
    });

export default userRouter;
