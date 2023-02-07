const codigo_credora = document.getElementById('codigo-credora');
const codigo_devedora = document.getElementById('codigo-devedora');
const form = document.getElementById('lancForm');

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
    for (let [key, value] of formData) {
        lancamento[key] = value;
    }
    console.log(lancamento);

    const lancamentos = getFromLocalStorage('lancamentos') || [];
    lancamentos.push(lancamento);
    saveToLocalStorage('lancamentos', lancamentos);

    // atualizarTabela();
    form.reset();
})