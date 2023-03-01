const resultadoRelatorio = document.querySelector('#resultadoRelatorio');
const btnGerarRelatorio = document.querySelector('#btnGerarRelatorio');


function atualizarTabela(){
    //calcular receitas despesas
    let receitas = 0;
    let despesas = 0;
    let contas = getFromLocalStorage('contas') || [];

    let contasESeusTotais = [];
    
    contas.forEach(function(conta){
        if (conta.tipo == 'R') {
            receitas += retornarSaldoConta(conta.codigo);
            contasESeusTotais.push({
                nome: conta.nome,
                tipo: conta.tipo,
                saldo: retornarSaldoConta(conta.codigo)
            });
        }else if(conta.tipo == 'D'){
            despesas += retornarSaldoConta(conta.codigo);
            contasESeusTotais.push({
                nome: conta.nome,
                tipo: conta.tipo,
                saldo: retornarSaldoConta(conta.codigo)
            });
        }
    });

    let saldo = receitas - despesas;

    //order receitas primeiro e despesas depois
    contasESeusTotais.sort(function(a, b){
        if(a.tipo == 'R' && b.tipo == 'D'){
            return -1;
        }else if(a.tipo == 'D' && b.tipo == 'R'){
            return 1;
        }else{
            return 0;
        }
    });

    contasESeusTotais.forEach(function(conta){
        const tr = document.createElement('tr');
        
        let nome = conta.nome;
        if(conta.tipo == 'D'){
            nome = '(-) ' + nome;
        }

        let saldo = conta.saldo;
        if(conta.tipo == 'D'){
            saldo = '('+saldo+')';
        }

        tr.innerHTML = `
            <td><b>${nome}</b></td>
            <td>${saldo}</td>
        `;
        resultadoRelatorio.appendChild(tr);
    });
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><b>Lucro</b></td>
        <td>${saldo}</td>
    `;
    resultadoRelatorio.appendChild(tr);
    
}