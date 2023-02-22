import { Router } from 'express';
import { register, login, logout, log, fetchLogs, clearLogs, loginGoogle, reddit } from '../controllers/logs.controller';
import JWT from '../middleware/authentication';

const router = Router();

router.get('/', JWT.verifyToken, fetchLogs);

router.get('/log', JWT.verifyToken, log);

router.get('/clear', JWT.verifyToken, clearLogs);

router.get('/register', register);

router.get('/login', login);

router.get('/logingoogle', loginGoogle);

router.get('/logout', logout);

router.get('/reddit', reddit);

export default router;