import {getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario} from "../repocitorios/users.repocitories.js";
import {validacionUsuario, validacionUsuarioParcial} from "../validations/users.validation.js";
import bcrypt from 'bcrypt';
const saltRounds = parseInt(process.env.SALT_ROUNDS_BCRYPT);

export const getUsuariosService = async () => {
    try {
        const usuarios = await getUsuarios();
        return usuarios[0];
    } catch (error) {
        throw error;
    }
}

export const getUsuarioService = async (nombre) => {
    try {
        const usuario = await getUsuario(nombre);
        return usuario[0][0];
    }
    catch (error) {
        throw error;
    }
}

export const postUsuarioService = async (usuario) => {
    try {
        const validarUsuario = validacionUsuario(usuario)
        if (validarUsuario.success) {
            let {nombre_usuario, record, contrasena} = usuario;
            if (record === undefined) {
                record = 1;
            }
            contrasena = bcrypt.hashSync(contrasena, saltRounds);
            const usuarioRes = await postUsuario(nombre_usuario, record, contrasena);
            return usuarioRes;
        }
        else {
            throw new Error(validarUsuario.error.message)
        }
    }
    catch (error) {
        throw error;
    }
}

export const putUsuarioService = async (usuarioPut, nombre) => {
    try {
        const validarUsuario = validacionUsuarioParcial(usuarioPut)
        if (validarUsuario.success) {
            const originalUsuario = await getUsuario(nombre);
            const objetoActualizado = {...originalUsuario[0][0], ...usuarioPut}
            const {nombre_usuario, record, contrasena} = objetoActualizado;
            const usuario = await putUsuario(nombre_usuario, record, contrasena, nombre);
            return usuario;
        } else {
            throw new Error(validarUsuario.error.message)
        }
    }
    catch (error) {
        throw error;
    }
}

export const deleteUsuarioService = async (id) => {
    try {
        const usuario = await deleteUsuario(id);
        return usuario;
    }
    catch (error) {
        throw error;
    }
}

