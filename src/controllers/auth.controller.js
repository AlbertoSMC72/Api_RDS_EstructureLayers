import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secretJWT = process.env.SECRET_JWT;
import { getUsuarioService } from '../services/users.service.js';

export const login = async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;

    const userFound = await getUsuarioService(nombre_usuario);

    if (!userFound) {
        return res.status(401).json({
            message: "name o contraseña incorrecta"
        });
    }

    const isCorrectPass = bcrypt.compareSync(contrasena, userFound.contrasena)

    if (!isCorrectPass) {
        return res.status(401).json({
            message: "name o contraseña incorrecta"
        });
    }

    const payload = {
        user: {
            _id: userFound._id
        }
    }

    const token = jwt.sign(payload, secretJWT, { expiresIn: '3h' });

    return res.status(200).json({
        message: "acceso concedido",
        token: token
    });
}
