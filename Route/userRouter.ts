import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const userRouter = express.Router();
userRouter.use(bodyParser.json());

let users = [
    { id: uuidv4(), name: "Tun", email: "tun@gmail.com", age: 20 },
    { id: uuidv4(), name: "Aung", email: "aung@gmail.com", age: 26 },
    { id: uuidv4(), name: "Kyaw", email: "kyaw@gmail.com", age: 28 },
];

userRouter.use(express.json());

userRouter
    .route("/")
    .get((req: Request, res: Response) => {
        res.send(users);
    })
    .post((req: Request, res: Response) => {
        const { name, email, age } = req.body;
        const user = { id: uuidv4(), name, email, age };
        users.push(user);
        res.send(users);
    });

userRouter
    .route("/:id")
    .put((req: Request, res: Response) => {
        const { id } = req.params;
        const { name, email, age } = req.body;
        users = users.map((user) => (user.id === id ? { id, name, email, age } : user));
        res.send(users);
    })
    .delete((req: Request, res: Response) => {
        const { id } = req.params;
        console.log(id);
        users = users.filter((user) => user.id !== id);
        res.send(users);
    });

export default userRouter;
