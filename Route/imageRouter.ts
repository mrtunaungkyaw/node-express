import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const imageRouter = express.Router();

imageRouter.use(bodyParser.json());
imageRouter.use(express.json());

imageRouter.route("/").post((req: Request, res: Response) => {
    console.log(req.body);
    const fileName = uuidv4();
    const type = req.headers["content-type"]?.split("/")[1];
    const writeStream = fs.createWriteStream(path.join(__dirname, "..", "public", "userImage", `${fileName}.${type}`));
    req.pipe(writeStream);
    console.log(writeStream.path);
    res.json({ fileName, type });
});

export default imageRouter;
