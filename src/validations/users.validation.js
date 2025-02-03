import z from 'zod';
const users = z.object({
    id_usuario: z.number({
        invalid_type_error: "El id es un numero"
    }).optional(),
    nombre_usuario: z.string({
        invalid_type_error: "El nombre es un conjunto de caracteres"
    }),
    contrasena: z.string({
        invalid_type_error: "La contraseña es un conjunto de caracteres"
    })
});

export function validacionUsuario(usuario) {
    return users.safeParse(usuario)
}

export function validacionUsuarioParcial(usuario) {
    return users.partial().safeParse(usuario)
}