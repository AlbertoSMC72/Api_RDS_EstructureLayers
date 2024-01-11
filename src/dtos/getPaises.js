export function getNombrePaises(params) {
    const arreglo = [];
    console.log(params);
    params.forEach(element   => {
        arreglo.push({
            nombre: element.nombre || "",
            codigo_iso: element.codigo_iso || ""
        })
    });
    return arreglo;
}

export function getNombrePais(params) {
    return {
        nombre: params.nombre || "",
        codigo_iso: params.codigo_iso || ""
    }
}