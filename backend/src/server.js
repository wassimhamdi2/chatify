import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import authRouters from "./routers/auth.router.js";
import messageRouters from "./routers/message.router.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";  
import cors from "cors";
import { app, server } from "./lib/socket.js";




const PORT = ENV.PORT || 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
//app.options("*", cors({ origin: ENV.CLIENT_URL, credentials: true })); 
app.use(cookieParser());    
app.use(express.json({ limit: "10mb" }));        
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use("/api/auth", authRouters);
app.use("/api/messages", messageRouters);





//make ready to deployement 
if (ENV.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../../frontend/dist");
    console.log("Serving static from:", distPath);

    app.use(express.static(distPath));
    
    app.get("*", (_, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}



server.listen(PORT, () => {
    console.log("server is running on port " + PORT);
    connectDB();

});



