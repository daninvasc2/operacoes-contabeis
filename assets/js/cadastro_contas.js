const form = document.querySelector('#contasForm');
const tableBody = document.querySelector('#contasTable tbody');
const inputFiltro = document.querySelector('#inputCodigoFiltro');
const btnFiltro = document.querySelector('#filtrarPorCodigo');

document.onload = atualizarTabela();

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const conta = {};
    for (let [key, value] of formData) {
        conta[key] = value;
    }
    console.log(conta);

    const contas = getFromLocalStorage('contas') || [];
    contas.push(conta);
    saveToLocalStorage('contas', contas);

    atualizarTabela();
    form.reset();
});



btnFiltro.addEventListener('click', () => {
    let codigo = inputFiltro.value;

    let contas = [];
    if(codigo != ""){
        contas = filtrarContaPorCodigo(codigo);
    }
    limparTabela();
    contas.forEach(function (conta) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${conta.codigo}</td>
            <td>${conta.nome}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="excluirConta(${conta.codigo})">
                    Excluir
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
});

function limparTabela() {
    tableBody.innerHTML="";
}

function atualizarTabela() {
    const contas = getFromLocalStorage('contas') || [];
    tableBody.innerHTML = '';
    contas.forEach(function (conta) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${conta.codigo}</td>
            <td>${conta.nome}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="excluirConta(${conta.codigo})">
                    Excluir
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function excluirConta(codigo) {
    const contas = getFromLocalStorage('contas') || [];
    const novaLista = contas.filter(function (conta) {
        return conta.codigo != codigo;
    });
    saveToLocalStorage('contas', novaLista);
    atualizarTabela();
}
