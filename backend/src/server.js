import express from "express";
import dotenv from "dotenv";
import authRouters from "./routers/auth.router.js";
import messageRouters from "./routers/message.router.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();



app.use("/api/auth", authRouters);
app.use("/api/messages", messageRouters);

//make ready for deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });
    console.log("we are in producation mode now");

}
app.listen(PORT, () => console.log("server is running on port " + PORT));

