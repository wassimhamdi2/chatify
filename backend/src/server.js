import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import authRouters from "./routers/auth.router.js";
import messageRouters from "./routers/message.router.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use("/api/auth", authRouters);
app.use("/api/messages", messageRouters);




//make ready to deployement 
if (process.env.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../../frontend/dist");
    console.log("Serving static from:", distPath);

    app.use(express.static(distPath));

    app.get("*", (_, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}



app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
    connectDB();

});



