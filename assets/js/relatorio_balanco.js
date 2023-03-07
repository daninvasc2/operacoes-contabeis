const tdPassivo = document.querySelector('#passivo');
const tdAtivo = document.querySelector('#ativo');
const trTotais = document.querySelector('#totais');
const tabelaBalanco = document.querySelector('#tabelaBalanco');
const btnPrint = document.querySelector('#btnPrint');

function atualizarTabela(){

    tdPassivo.innerHTML = '';
    tdAtivo.innerHTML = '';
    trTotais.innerHTML = '';

    totalAtivo = 0;
    totalPassivo = 0;
    
    const contas = getFromLocalStorage('contas') || [];

    const contasPassivo = contas.filter(function(conta){
        return conta.tipo === 'P';
    });

    const contasAtivo = contas.filter(function(conta){
        return conta.tipo === 'A';
    });

    const contasPatrimonio = contas.filter(function(conta){
        return conta.tipo === 'PL';
    });

    contasPassivo.forEach(function(conta){
        let stringTabela = '';
        stringTabela += `
            <table class="table table-striped table-bordered table-hover">
                <tbody>
                    <tr>
                        <td width="70%">${conta.nome}</td>
                        <td> ${retornarSaldoConta(conta.codigo)}</td>
                    </tr>
                </tbody>
            </table>
        `;
        totalPassivo += retornarSaldoConta(conta.codigo);
        tdPassivo.innerHTML += stringTabela;
    });

    contasAtivo.forEach(function(conta){
        let stringTabela = '';
        stringTabela += `
            <table class="table table-striped table-bordered table-hover">
                <tbody>
                    <tr>
                        <td width="70%">${conta.nome}</td>
                        <td> ${retornarSaldoConta(conta.codigo)}</td>
                    </tr>
                </tbody>
            </table>
        `;
        totalAtivo += retornarSaldoConta(conta.codigo);
        tdAtivo.innerHTML += stringTabela;
    });

    // tdPassivo.innerHTML += `<h6>Patrimônio Líquido</h6>`;
    
    contasPatrimonio.forEach(function(conta){
        let stringTabela = '';
        stringTabela += `
            <table class="table table-striped table-bordered table-hover">
                <tbody>
                    <tr>
                        <td width="70%">${conta.nome}</td>
                        <td> ${retornarSaldoConta(conta.codigo)}</td>
                    </tr>
                </tbody>
            </table>
        `;
        totalPassivo += retornarSaldoConta(conta.codigo);
        tdPassivo.innerHTML += stringTabela;
    });

    const lucroAcumulado = retornaLucroDoDRE();

    let stringTabela = '';
    stringTabela += `
        <table class="table table-striped table-bordered table-hover">
            <tbody>
                <tr>
                    <td width="70%">Lucro Acumulado</td>
                    <td> ${lucroAcumulado}</td>
                </tr>
            </tbody>
        </table>
    `;
    totalPassivo += lucroAcumulado;
    tdPassivo.innerHTML += stringTabela;
    
    trTotais.innerHTML = `
        <td><b>Ativo Total</b></td>
        <td><b>${totalAtivo}</b></td>
        <td><b>Passivo Total</b></td>
        <td><b>${totalPassivo}</b></td>
    `;
    tabelaBalanco.appendChild(trTotais);

    btnPrint.classList.remove('d-none');
}

