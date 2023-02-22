import { Router } from "express";
import { aboutJson } from "../controllers/about.controller";

const router = Router();

router.get('/', aboutJson);

export default router;