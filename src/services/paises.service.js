import { getPaises } from '../repocitorios/paises.repocitories.js';
import { getNombrePaises } from "../dtos/getPaises.js"
export const getPaisesService = async () => {
    try {
        const paises = await getPaises();
        return getNombrePaises(paises[0]);
    } catch (error) {
        throw error;
    }
}

import { getPais } from '../repocitorios/paises.repocitories.js';
import { getNombrePais } from "../dtos/getPaises.js"
export const getPaisService = async (id) => {
    try {
        const pais = await getPais(id);
        return getNombrePais(pais[0][0]);
    }
    catch (error) {
        throw error;
    }
}

import { postPais } from '../repocitorios/paises.repocitories.js';
import { validacionPais } from "../validations/paises.validation.js"
export const postPaisService = async (pais) => {
    try {
        const validarPais = validacionPais(pais)
        if (validarPais.success) {
            const { nombre, codigo_iso, capital, poblacion, idioma_principal } = pais;
            const paisRes = await postPais(nombre, codigo_iso, capital, poblacion, idioma_principal);
            return paisRes;
        }
        else {
            throw new Error(validarPais.error.message)
        }
    }
    catch (error) {
        throw error;
    }
}

import { putPais } from '../repocitorios/paises.repocitories.js';
import { validacionPaisParcial } from "../validations/paises.validation.js"
export const putPaisService = async (paisPut, id) => {
    try {
        const validarPais = validacionPaisParcial(paisPut)
        if (condition) {
            const originalPais = await getPais(id);
            const objetoActualizado = { ...originalPais[0][0], ...paisPut }
            const { nombre, codigo_iso, capital, poblacion, idioma_principal } = objetoActualizado;
            const pais = await putPais(nombre, codigo_iso, capital, poblacion, idioma_principal, id);
            return pais;
        } else {
            throw new Error(validarPais.error.message)
        }
    }
    catch (error) {
        throw error;
    }
}

import { deletePais } from '../repocitorios/paises.repocitories.js';
export const deletePaisService = async (id) => {
    try {
        const pais = await deletePais(id);
        return pais;
    }
    catch (error) {
        throw error;
    }
}
