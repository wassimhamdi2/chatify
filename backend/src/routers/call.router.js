import express from "express";
import { getCallHistory, saveCall } from "../controllers/call.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/history", getCallHistory);
router.post("/save", saveCall);

export default router;
