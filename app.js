import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import idex from './src/routes/index.router.js';
import confing from './src/config/confing.js';
import { createServer } from 'http';
const app = new Express();

app.use(Cors());

dotenv.config();

app.use(Express.json());

app.use("/", idex);

app.set('port', process.env.PORT);

app.use(`*`, (req, res) => {
    res.status(404).send("Ruta equivocada");
});

confing.connect().then(() => {
    console.log("Base de datos conectada");
}).catch((error) => {
    console.log(error);
})

const httpServer = createServer(app);

httpServer.listen(process.env.PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${process.env.PORT}`);
});

