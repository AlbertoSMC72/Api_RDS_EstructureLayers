import { Router } from "express";
import paisesRouter from "./paises.router.js";
import usersRouter from "./user.route.js"
import loguinRouter from "./auth.route.js";

const router = Router();
const prefijo = "app";

router.use(`/${prefijo}/paises`, paisesRouter);
router.use(`/${prefijo}/user`, usersRouter)
router.use(`/${prefijo}/auth`, loguinRouter);


export default router;
