import { Router } from "express";
import { fetchCards, addCard, updateCardAction, updateCardReaction, fetchId, removeCard, redditAuth } from "../controllers/cards.controller";
import JWT from '../middleware/authentication';

const router = Router();

router.get('/', JWT.verifyToken, fetchCards);
router.get('/id', JWT.verifyToken, fetchId);
router.get('/add', JWT.verifyToken, addCard);
router.get('/delete', JWT.verifyToken, removeCard);
router.get('/updateAction', JWT.verifyToken, updateCardAction);
router.get('/updateReaction', JWT.verifyToken, updateCardReaction);
router.get('/redditAuth', JWT.verifyToken, redditAuth)

export default router;