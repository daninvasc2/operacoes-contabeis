const resultadoRelatorio = document.querySelector('#resultadoRelatorio');
const selectConta = document.querySelector('#selectConta');
const saldoConta = document.querySelector('#saldoConta');
const tituloConta = document.querySelector('#tituloConta');

document.onload = populaSelectComContas();

function atualizarTabela() {
    resultadoRelatorio.innerHTML = '';
    const codigoContaSelecionada = selectConta.value;
    const contaObject = filtrarContaPorCodigo(codigoContaSelecionada)[0];

    if (!contaObject) {
        return;
    }

    tituloConta.textContent = contaObject.nome;
    const lancamentos = getFromLocalStorage('lancamentos') || [];
    const lancamentosComConta = lancamentos.filter(function (lancamento) {
        return lancamento.codigo_credora === codigoContaSelecionada || lancamento.codigo_devedora === codigoContaSelecionada;
    });

    let totalDebito = 0;
    let totalCredito = 0;

    lancamentosComConta.forEach(function (lancamento) {
        let codigoOutraConta = lancamento.codigo_credora === codigoContaSelecionada ? lancamento.codigo_devedora : lancamento.codigo_credora;
        let stringTabela = '';
        stringTabela += `
            <tr>
                <td>${lancamento.data}</td>
                <td>${codigoOutraConta} - ${filtrarContaPorCodigo(codigoOutraConta)[0].nome}</td>
                <td>${lancamento.historico}</td>
        `;

        if (lancamento.codigo_credora === codigoContaSelecionada) {
            stringTabela += `
                <td class="cor-debito">${Number(lancamento.valor)}</td>
                <td></td>
            </tr>`;
            totalCredito += Number(lancamento.valor);
        } else {
            stringTabela += `
                <td></td>
                <td class="cor-credito">${Number(lancamento.valor)}</td>
            </tr>`;
            totalDebito += Number(lancamento.valor);
        }

        resultadoRelatorio.innerHTML += stringTabela;
    });

    saldoConta.innerHTML = totalDebito - totalCredito;
}

function populaSelectComContas() {
    const contas = getFromLocalStorage('contas') || [];
    contas.forEach(function (conta) {
        selectConta.innerHTML += `<option value="${conta.codigo}">${conta.nome}</option>`;
    });
}

function montaTrSaldoInicial() {
    const codigoContaSelecionada = selectConta.value;
    const contaObject = filtrarContaPorCodigo(codigoContaSelecionada)[0];

    if (!contaObject) {
        return;
    }

    const saldoInicial = contaObject.saldo_anterior;
    const saldoInicialTr = document.createElement('tr');
    let data = '';
    data = `
        <td>0</td>
        <td>${contaObject.codigo} - ${contaObject.nome}</td>
        <td>Saldo Inicial</td>
    `;

    if (contaObject.tipo_saldo === 'D') {
        data += `
            <td class="cor-debito">${saldoInicial}</td>
            <td></td>
        </tr>`;
    } else {
        data += `
            <td></td>
            <td class="cor-credito">${saldoInicial}</td>
        </tr>`;
    }

    saldoInicialTr.innerHTML = data;

    resultadoRelatorio.appendChild(saldoInicialTr);
}