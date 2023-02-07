function filtrarContaPorCodigo(codigo){
    let contas = getFromLocalStorage('contas') || [];
    return contas.filter((c) => c.codigo == codigo);
}