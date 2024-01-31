import {getUsuariosService, getUsuarioService, postUsuarioService, putUsuarioService, deleteUsuarioService} from '../services/users.service.js';

export const getUsuariosController =  async (req, res) => {
    getUsuariosService()
    .then((usuarios) => res.status(200).json(usuarios))
    .catch((error) => res.status(500).send(error.message))
}

export const getUsuarioController =  async (req, res) => {
    const {nombre} = req.params;
    getUsuarioService(nombre)
    .then((usuario) => res.status(200).json(usuario))
    .catch((error) => res.status(500).send(error.message))
}

export const postUsuarioContoller = async (req , res) => {
    const usuario = req.body;
    postUsuarioService(usuario)
    .then((usuario) => res.status(200).json(usuario))
    .catch((error) => res.status(500).send(error.message))
}

export const putUsuarioController = async (req , res) => {
    const {nombre} = req.params;
    const usuario = req.body;
    putUsuarioService(usuario,nombre)
    .then((usuario) => res.status(200).json(usuario))
    .catch((error) => res.status(500).send(error.message))
}

export const deleteUsuarioController = async (req , res) => {
    const {id} = req.params;
    deleteUsuarioService(id)
    .then((usuario) => res.status(200).json(usuario))
    .catch((error) => res.status(500).send(error.message))
}

