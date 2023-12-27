import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const imageRouter = express.Router();

imageRouter.use(bodyParser.json());
imageRouter.use(express.json());

imageRouter.route("/").post((req: Request, res: Response) => {
    const fileName = uuidv4();
    const type = req.headers["content-type"]?.split("/")[1];
    const writeStream = fs.createWriteStream(path.join(__dirname, "..", "public", "userImage", `${fileName}.${type}`));
    req.pipe(writeStream);
    res.json({ fileName, type });
});

imageRouter.route("/:id").put((req: Request, res: Response) => {
    const updateProfileId = req.params.id;
    const type = req.headers["content-type"]?.split("/")[1];
    const writeStream = fs.createWriteStream(
        path.join(__dirname, "..", "public", "userImage", `${updateProfileId}.${type}`)
    );
    req.pipe(writeStream);
    res.json({ updateProfileId, type });
});

export default imageRouter;
