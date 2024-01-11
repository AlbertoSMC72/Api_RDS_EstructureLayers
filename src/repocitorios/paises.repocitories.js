import confing from '../config/confing.js';

export const getPaises = () => new Promise((resolve, reject) => {
    const consulta =" SELECT * FROM paises"
    confing.execute(consulta)
    .then((resultados) => resolve(resultados))
    .catch((error) => reject(error))
}); 

export const getPais = (id) => new Promise((resolve, reject) => {
    const consulta =" SELECT * FROM paises WHERE id = ?"
    confing.execute(consulta, [id])
    .then((resultados) => resolve(resultados))
    .catch((error) => reject(error))
});

export const postPais = (nombre, codigo_iso, capital, poblacion, idioma_principal) => new Promise((resolve, reject) => {
    const consulta =" INSERT INTO paises (nombre, codigo_iso, capital, poblacion, idioma_principal) VALUES (?,?,?,?,?)"
    confing.execute(consulta, [nombre, codigo_iso, capital, poblacion, idioma_principal])
    .then((resultados) => resolve(resultados))
    .catch((error) => reject(error))
});

export const putPais = (nombre, codigo_iso, capital, poblacion, idioma_principal,id) => new Promise((resolve, reject) => {
    const consulta =" UPDATE paises SET nombre = ?, codigo_iso = ?, capital = ?, poblacion = ?, idioma_principal = ? WHERE id = ?"
    confing.execute(consulta, [nombre, codigo_iso, capital, poblacion, idioma_principal,id])
    .then((resultados) => resolve(resultados))
    .catch((error) => reject(error))
});

export const deletePais = (id) => new Promise((resolve, reject) => {
    const consulta =" DELETE FROM paises WHERE id = ?"
    confing.execute(consulta, [id])
    .then((resultados) => resolve(resultados))
    .catch((error) => reject(error))
});


