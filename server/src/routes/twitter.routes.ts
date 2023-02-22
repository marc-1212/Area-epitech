import { Router } from "express";
import { activateTwitter, deactivateTwitter, fetchTwitterStatus } from "../controllers/twitter.controller";
import JWT from '../middleware/authentication';

const router = Router();

router.get('/activate', JWT.verifyToken, activateTwitter);
router.get('/deactivate', JWT.verifyToken, deactivateTwitter);
router.get('/', JWT.verifyToken, fetchTwitterStatus);

export default router;