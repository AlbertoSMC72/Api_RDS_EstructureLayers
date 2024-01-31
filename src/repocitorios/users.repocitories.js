import confing from '../config/confing.js';

export const getUsuarios = () =>
    new Promise((resolve, reject) => {
        const consulta = " SELECT * FROM jugadores";
        confing
            .execute(consulta)
            .then((resultados) => resolve(resultados))
            .catch((error) => reject(error));
    });

export const getUsuario = (nombre) =>
    new Promise((resolve, reject) => {
        const consulta = " SELECT * FROM jugadores WHERE nombre_usuario = ?";
        confing
            .execute(consulta, [nombre])
            .then((resultados) => resolve(resultados))
            .catch((error) => reject(error));
    });

export const postUsuario = (nombre_usuario, record, contrasena) =>
    new Promise((resolve, reject) => {
        const consulta =
            " INSERT INTO jugadores (nombre_usuario, record, contrasena) VALUES (?, ?, ?)";
        confing
            .execute(consulta, [nombre_usuario, record, contrasena])
            .then((resultados) => resolve(resultados))
            .catch((error) => reject(error));
    });

export const putUsuario = (nombre_usuario, record, contrasena, nombre) =>
    new Promise((resolve, reject) => {
        const consulta =
            " UPDATE jugadores SET nombre_usuario = ?, record = ?, contrasena = ? WHERE nombre_usuario = ?";
        confing
            .execute(consulta, [nombre_usuario, record, contrasena, nombre])
            .then((resultados) => resolve(resultados))
            .catch((error) => reject(error));
    });

export const deleteUsuario = (id) =>
    new Promise((resolve, reject) => {
        const consulta = " DELETE FROM jugadores WHERE id_usuario = ?";
        confing
            .execute(consulta, [id])
            .then((resultados) => resolve(resultados))
            .catch((error) => reject(error));
    });
