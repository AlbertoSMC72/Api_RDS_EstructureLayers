import e from 'express';
import {getPaisesService} from '../services/paises.service.js';
export const getPaisesController =  async (req, res) => {
    getPaisesService()
    .then((paises) => res.status(200).json(paises))
    .catch((error) => res.status(500).send(error.message))
} 

import {getPaisService} from '../services/paises.service.js';
export const getPaisController =  async (req, res) => {
    const {id} = req.params;
    getPaisService(id)
    .then((pais) => res.status(200).json(pais))
    .catch((error) => res.status(500).send(error.message))
}

import { postPaisService } from '../services/paises.service.js';
export const postPaisContoller = async (req , res) => {
    const pais = req.body;
    postPaisService(pais)
    .then((pais) => res.status(200).json(pais))
    .catch((error) => res.status(500).send(error.message))
}

import { putPaisService } from '../services/paises.service.js';
export const putPaisController = async (req , res) => {
    const {id} = req.params;
    const pais = req.body;
    putPaisService(pais,id)
    .then((pais) => res.status(200).json(pais))
    .catch((error) => res.status(500).send(error.message))
}

import { deletePaisService } from '../services/paises.service.js';
export const deletePaisController = async (req , res) => {
    const {id} = req.params;
    deletePaisService(id)
    .then((pais) => res.status(200).json(pais))
    .catch((error) => res.status(500).send(error.message))
}