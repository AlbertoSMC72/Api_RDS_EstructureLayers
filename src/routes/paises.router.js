import { getPaisesController, getPaisController,postPaisContoller,putPaisController, deletePaisController} from "../controllers/paises.controller.js";
import {Router} from 'express';
const paisesRouter = Router();

paisesRouter.get('/', getPaisesController);
paisesRouter.get('/:id', getPaisController);
paisesRouter.post('/',postPaisContoller );
paisesRouter.put('/:id', putPaisController);
paisesRouter.delete('/:id', deletePaisController);

export default paisesRouter;