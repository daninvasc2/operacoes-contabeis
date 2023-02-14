const tableBody = document.querySelector('#contasTable tbody');

function atualizarTabela() {
    let contas = getFromLocalStorage('contas') || [];

    tableBody.innerHTML = '';
    contas.forEach(function (conta) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${conta.codigo}</td>
            <td>${conta.nome}</td>
        `;
        tableBody.appendChild(tr);
    });
}