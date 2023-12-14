import express from "express";
import userRouter from "./Route/userRouter";
const app = express();
const PORT = 3000;

app.use(express.static("public"));

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
