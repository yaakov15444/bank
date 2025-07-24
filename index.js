import express from "express";
import connectToMongo from "./src/db/connectToMongo.js";
connectToMongo();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use((req, res, next) => {
    console.log(
        `${new Date().toISOString()} - ${req.method} request to ${req.originalUrl}`
    ); 

    next();
});;
app.listen(3000, () => console.log("Server is running on port 3000"));