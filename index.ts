import dotenv from "dotenv";
import express, { Request, Response } from "express";
import userRouter from "./Route/userRouter";

dotenv.config();

const app = express();
const PORT = 3000;

const apiUrl = process.env.API_URL;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script type=text/javascript>
        localStorage.setItem("apiUrl", "${apiUrl}")
        window.location.href = "/"
    </script>
</body>
</html>
`;

app.use(express.static("public"));

app.get("/api", (req: Request, res: Response) => {
    res.send(html);
});

app.use("/users", userRouter);

// // middleware function
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
//     // res.status(200).send("GET index.html");
// });

// app.get("/script.js", (req, res) => {
//     res.sendFile(__dirname + "/script.js");
//     // res.status(200).send("GET script.js");
// });

// app.get("/style.css", (req, res) => {
//     res.sendFile(__dirname + "/style.css");
//     // res.status(200).send("GET style.css");
// });

// app.post("/fileUpload", (req, res) => {
//     req.res.status(200).send("DELETE Method");
// });

// app.route middleware
// app.route("/book")
//     .get((req, res) => {
//         res.send("all book GET Method");
//     })
//     .post((req, res) => {
//         res.send("create book POST Method");
//     })
//     .put((req, res) => {
//         res.send("update book PUT Method");
//     })
//     .delete((req, res) => {
//         res.send("create book DELETE Method");
//     });

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
