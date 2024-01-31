import {login} from '../controllers/auth.controller.js';
import { Router } from 'express';
const loguinRouter = Router();

loguinRouter.post('/login',  login);

export default loguinRouter;