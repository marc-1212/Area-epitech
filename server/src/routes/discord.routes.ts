import { Router } from "express";
import { fetchDiscordStatus } from "../controllers/discord.controller";
import { activateCard, deactivateCard } from "../controllers/cards.controller";
import JWT from '../middleware/authentication';

const router = Router();

router.get('/activate', JWT.verifyToken, activateCard);
router.get('/deactivate', JWT.verifyToken, deactivateCard);
router.get('/', JWT.verifyToken, fetchDiscordStatus);

export default router;