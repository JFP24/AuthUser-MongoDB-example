import { Router } from "express";
import { singnin, singnup } from "../controllers/auth.controller.js";
const router = Router();

router.post("/singnin", singnin);
router.post("/singnup", singnup);
export default router;
