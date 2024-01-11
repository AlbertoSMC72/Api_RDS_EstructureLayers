import z from "zod"; 
const paises = z.object({
    id:z.number({
        invalid_type_error:"Id necerio para crearse"
    }).optional(), //hace que este parametro sea opcional
    nombre:z.string({
        invalid_type_error:"El nombre es necesario para pordesr guardar"
    }),
    codigo_iso: z.string({
        invalid_type_error:"El codigo iso es necesario para pordesr guardar"
    }),
    capital: z.string({
        invalid_type_error:"La capital es un conjunto de cacteres"
    }),
    poblacion: z.number({
        invalid_type_error:"La poblacion solo numeros"
    }),
    idioma_principal: z.string({
        invalid_type_error:"El idioma principal es un conjunto de cacteres"
    })
});

export function validacionPais(pais) {
    return paises.safeParse(pais)
}

export function validacionPaisParcial(pais) {
    return paises.safeParse(pais)

}