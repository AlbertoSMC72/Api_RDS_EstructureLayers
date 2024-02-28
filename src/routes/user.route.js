import { getUsuariosController, getUsuarioController, postUsuarioContoller, putUsuarioController, deleteUsuarioController } from '../controllers/user.controller.js';
import { Router } from 'express';
import { verifyJWT } from '../middlewares/http/auth.middleware.js';
const userRouter = Router();

userRouter.get('/', getUsuariosController);
userRouter.get('/:nombre', getUsuarioController);
userRouter.post('/', postUsuarioContoller);
userRouter.put('/:nombre', verifyJWT, putUsuarioController);
userRouter.delete('/:id', verifyJWT, deleteUsuarioController);

export default userRouter;