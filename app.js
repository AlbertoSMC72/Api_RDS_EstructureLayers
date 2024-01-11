import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import idex from './src/routes/index.router.js';
import confing from './src/config/confing.js';
const app = new Express();

app.use(Cors());
dotenv.config();
app.use(Express.json());
app.use("/" , idex);
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

app.use(`*`, (req, res) => {
    res.status(404).send("Ruta equivocada");
});

confing.connect().then(() => {
    console.log("Base de datos conectada");
}).catch((error) => {
    console.log(error);
})