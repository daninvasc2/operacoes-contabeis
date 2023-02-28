function filtrarContaPorCodigo(codigo){
    let contas = getFromLocalStorage('contas') || [];
    return contas.filter((c) => c.codigo == codigo);
}

function retornarSaldoConta(codigo){
    let lancamentos = getFromLocalStorage('lancamentos') || [];
    let saldo = 0;
    lancamentos.forEach(function(lancamento){
        if(lancamento.codigo_credora == codigo){
            saldo += Number(lancamento.valor);
        }else if(lancamento.codigo_devedora == codigo){
            saldo -= Number(lancamento.valor);
        }
    });

    let contas = getFromLocalStorage('contas') || [];
    let conta = contas.find((c) => c.codigo == codigo);
    if (conta.saldo_anterior > 0 ){
        if (conta.tipo_saldo == 'D') {
            saldo -= Number(conta.saldo_anterior);
        } else {
            saldo += Number(conta.saldo_anterior);
        }
    }


    return Math.abs(saldo);
}