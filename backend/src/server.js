import express from "express";
import dotenv from "dotenv";
import authRouters from "./routers/auth.router.js";
import messageRouters from "./routers/message.router.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT ;


app.use("/api/auth", authRouters);
app.use("/api/messages", messageRouters);



app.listen(PORT, () => console.log("server is running on port 3000"));


export default app;
