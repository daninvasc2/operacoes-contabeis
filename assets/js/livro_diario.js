const tableBody = document.querySelector('#lancTable tbody');
const inputCodigoFiltroInicial = document.querySelector('#inputCodigoFiltroInicial');
const inputCodigoFiltroFinal = document.querySelector('#inputCodigoFiltroFinal');
const filtrarPorData = document.querySelector('#filtrarPorData');

// document.onload = atualizarTabela();

// function atualizarTabela() {
//     const lancamentos = getFromLocalStorage('lancamentos') || [];
//     tableBody.innerHTML = '';
//     lancamentos.forEach(function (lancamento) {
//         const tr = document.createElement('tr');
//         const conta_credora = filtrarContaPorCodigo(lancamento.codigo_credora);
//         const conta_devedora = filtrarContaPorCodigo(lancamento.codigo_devedora);

//         const data_formatada = lancamento.data.split('-');
//         lancamento.data = `${data_formatada[2]}/${data_formatada[1]}/${data_formatada[0]}`;

//         tr.innerHTML = `
//             <td>${conta_credora[0].codigo} - codigota_credora[0].nome}</td>
//             <td>${conta_devedora[0].codigo} - ${conta_devedora[0].nome}</td>
//             <td>${lancamento.data}</td>
//             <td>R$ ${Number(lancamento.valor).toFixed(2)}</td>
//         `;
//         tableBody.appendChild(tr);
//     });
// }

filtrarPorData.addEventListener('click', () => {
    const lancamentos = getFromLocalStorage('lancamentos') || [];
    let valor_incial = inputCodigoFiltroInicial.value;
    let valor_final = inputCodigoFiltroFinal.value;
    let auxInicial, auxFinal;
    let lista_final = [];
    lancamentos.forEach(lancamento => {
        const data_formatada = lancamento.data.split('-');
        const valor_formatado_incial = valor_incial.split('-');
        const valor_formatado_final = valor_final.split('-');
        lancamento.data = `${data_formatada[2]}/${data_formatada[1]}/${data_formatada[0]}`;
        auxInicial = `${valor_formatado_incial[2]}/${valor_formatado_incial[1]}/${valor_formatado_incial[0]}`;
        auxFinal = `${valor_formatado_final[2]}/${valor_formatado_final[1]}/${valor_formatado_final[0]}`;
        if (auxFinal < auxInicial)
        if (auxFinal < auxInicial) {
            tableBody.innerHTML = '';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td colspan="6" class="erro">A data final não pode ser maior que a data inicial</td>
            `;
            tableBody.appendChild(tr);
        } else {
            if ((auxInicial <= lancamento.data) && (lancamento.data <= auxFinal)) {
                lista_final.push(lancamento);
            }
            tableBody.innerHTML = '';
        }
    });

    for (let i = 0; i < (lista_final.length); i++) {
        for (let j = 0; j < (lista_final.length); j++) {
            if (lista_final[i].id < lista_final[j].id) {
                let temp = lista_final[i]
                lista_final[i] = lista_final[j]
                lista_final[j] = temp
            }
        }
    }

    lista_final.forEach(l => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${l.id}</td>
            <td>${l.data}</td>
            <td>${l.codigo_credora}</td>
            <td>${l.codigo_devedora}</td>
            <td>${l.historico}</td>
            <td>R$ ${Number(l.valor).toFixed(2)}</td>
        `;
        tableBody.appendChild(tr);

    });
});