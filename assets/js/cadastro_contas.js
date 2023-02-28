const form = document.querySelector('#contasForm');
const tableBody = document.querySelector('#contasTable tbody');
const codigoConta = document.querySelector('#codigo');
const nomeConta = document.querySelector('#nome');
const btnSubmit = document.querySelector('#btn-submit');
const modalExcluir = document.querySelector('#modalExcluir');
const inputFiltro = document.querySelector('#inputCodigoFiltro');
const btnFiltro = document.querySelector('#filtrarPorCodigo');

document.onload = atualizarTabela();

$('#exampleModal').on('shown.bs.modal', function () {
    console.log('teste');
});

form.addEventListener('submit', function (event) {
    console.log($("#exampleModal"));
    event.preventDefault();
    const formData = new FormData(form);
    const conta = {};
    for (let [key, value] of formData) {
        conta[key] = value;
    }

    const contas = getFromLocalStorage('contas') || [];

    if (btnSubmit.value == 'Atualizar') {
        const novaLista = contas.map(function (conta) {
            if (conta.codigo == codigoConta.value) {
                conta.nome = nomeConta.value;
            }
            return conta;
        });

        saveToLocalStorage('contas', novaLista);
        btnSubmit.value = 'Cadastrar';
        btnSubmit.textContent = 'Cadastrar';
        form.reset();
        atualizarTabela();
        return;
    }

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
    atualizarTabela(contas);
});

function limparTabela() {
    tableBody.innerHTML="";
}

function atualizarTabela(contasParam = false) {
    let contas = getFromLocalStorage('contas') || [];
    if (contasParam) {
        contas = contasParam;
    }

    tableBody.innerHTML = '';
    contas.forEach(function (conta) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${conta.codigo}</td>
            <td>${conta.nome}</td>
            <td>${retornaTipoConta(conta.tipo)}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="editarConta('${conta.codigo}')">
                    Editar
                </button>
                <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#exampleModal" onclick="excluirConta('${conta.codigo}')">
                    Excluir
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function retornaTipoConta(tipo) {
    
    switch (tipo) {
        case 'A':
            return 'Ativo';
        case 'P':
            return 'Passivo';
        case 'R':
            return 'Receita';
        case 'D':
            return 'Despesa';
        case 'PL':
            return 'Patrimônio Líquido';
    }

}

function excluirConta(codigo, force = false) {
    const contas = getFromLocalStorage('contas') || [];
    $("#texto-exclusao").text("Deseja excluir a conta " + codigo + "?");

    const btnExcluir = document.querySelector('#btn-modal-excluir');
    btnExcluir.onclick = function () {
        excluirConta(codigo, true);
    };

    if (!force) {
        return;
    }

    const novaLista = contas.filter(function (conta) {
        return conta.codigo != codigo;
    });

    saveToLocalStorage('contas', novaLista);
    atualizarTabela();
}

function editarConta(codigo) {
    const contas = getFromLocalStorage('contas') || [];
    const conta = contas.find(function (conta) {
        return conta.codigo == codigo;
    });

    codigoConta.value = conta.codigo;
    nomeConta.value = conta.nome;

    btnSubmit.value = 'Atualizar';
    btnSubmit.textContent = 'Atualizar';
}