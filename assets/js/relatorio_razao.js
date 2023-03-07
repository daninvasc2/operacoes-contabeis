const resultadoRelatorio = document.querySelector('#resultadoRelatorio');
const selectConta = document.querySelector('#selectConta');
const saldoConta = document.querySelector('#saldoConta');
const tituloConta = document.querySelector('#tituloConta');
const tdTotal = document.querySelector('#tdTotal');
const btnPrint = document.querySelector('#btnPrint');

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

    montaTrSaldoInicial();
    let totalDebito = contaObject.tipo_saldo === 'D' ? Number(contaObject.saldo_anterior) : 0;
    let totalCredito = contaObject.tipo_saldo === 'C' ? Number(contaObject.saldo_anterior) : 0;


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
                <td></td>
                <td class="cor-credito text-right">${Number(lancamento.valor)}</td>
            </tr>`;
            totalCredito += Number(lancamento.valor);
        } else {
            stringTabela += `
                <td class="cor-debito text-left">${Number(lancamento.valor)}</td>
                <td></td>
            </tr>`;
            totalDebito += Number(lancamento.valor);
        }

        resultadoRelatorio.innerHTML += stringTabela;
    });

    saldoConta.innerHTML = Math.abs(totalDebito - totalCredito);

    if (totalCredito > totalDebito) {
        $('#saldoConta').attr('colspan', 2);
        $('#saldoConta').attr('class', 'text-right');
    } else {
        $('#saldoConta').attr('colspan', 1);
        $('#saldoConta').attr('class', 'text-left');
    }

    btnPrint.classList.remove('d-none');
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
    if (!saldoInicial) {
        return;
    }

    const saldoInicialTr = document.createElement('tr');
    let data = '';
    data = `
        <td>0</td>
        <td>Saldo Inicial</td>
        <td>Saldo Inicial</td>
    `;

    if (contaObject.tipo_saldo === 'D') {
        data += `
            <td class="cor-debito text-left">${saldoInicial}</td>
            <td></td>
        </tr>`;
    } else {
        data += `
            <td></td>
            <td class="cor-credito text-right">${saldoInicial}</td>
        </tr>`;
    }

    saldoInicialTr.innerHTML = data;

    resultadoRelatorio.appendChild(saldoInicialTr);
}