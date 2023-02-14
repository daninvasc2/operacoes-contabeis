const codigo_credora = document.getElementById('codigo_credora');
const codigo_devedora = document.getElementById('codigo_devedora');
const form = document.getElementById('lancForm');
const tableBody = document.querySelector('#lancTable tbody');

document.onload = atualizarTabela();

codigo_credora.addEventListener('blur', () => {
    let codigo = codigo_credora.value;
    let contas = [];
    if (codigo != "") {
        contas = filtrarContaPorCodigo(codigo);
    }
    if (contas.length > 0) {
        document.getElementById('nome-credora').value = contas[0].nome;
    } else {
        document.getElementById('nome-credora').value = "Conta não encontrada";
    }
});

codigo_devedora.addEventListener('blur', () => {
    let codigo = codigo_devedora.value;
    let contas = [];
    if (codigo != "") {
        contas = filtrarContaPorCodigo(codigo);
    }
    if (contas.length > 0) {
        document.getElementById('nome-devedora').value = contas[0].nome;
    } else {
        document.getElementById('nome-devedora').value = "Conta não encontrada";
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const lancamento = {};
    const lancamentos = getFromLocalStorage('lancamentos') || [];
    lancamento.id = lancamentos.length + 1;

    for (let [key, value] of formData) {
        lancamento[key] = value;
    }

    lancamentos.push(lancamento);
    saveToLocalStorage('lancamentos', lancamentos);

    atualizarTabela();
    form.reset();
});

function atualizarTabela(){
    const lancamentos = getFromLocalStorage('lancamentos') || [];
    console.log(lancamentos);
    if (lancamentos.length < 1) {
        return;
    }

    tableBody.innerHTML = '';
    lancamentos.forEach(function (lancamento) {
        const tr = document.createElement('tr');
        const conta_credora = filtrarContaPorCodigo(lancamento.codigo_credora);
        const conta_devedora = filtrarContaPorCodigo(lancamento.codigo_devedora);

        const data_formatada = lancamento.data.split('-');
        lancamento.data = `${data_formatada[2]}/${data_formatada[1]}/${data_formatada[0]}`;

        tr.innerHTML = `
            <td>${conta_credora[0].codigo} - ${conta_credora[0].nome}</td>
            <td>${conta_devedora[0].codigo} - ${conta_devedora[0].nome}</td>
            <td>${lancamento.data}</td>
            <td>R$ ${Number(lancamento.valor).toFixed(2)}</td>
        `;
        tableBody.appendChild(tr);
    });
}