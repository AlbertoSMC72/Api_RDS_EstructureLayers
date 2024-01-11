import { Router } from "express";
import paisesRouter from "./paises.router.js";
const router = Router();
const prefijo ="app";

router.use(`/${prefijo}/paises`, paisesRouter);

export default router;
