import express from "express";

const router = express.Router();

router.get("/signin", (req, res) => { 
    res.send("signin endpoint");
});

router.get("/signup", (req, res) => { 
    res.send("signup endpoint");
});

router.get("/logout", (req, res) => { 
        res.send("logout endpoint");
});


export default router;