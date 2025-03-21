let registros = [];

function adicionarRegistro() {
    const data = document.getElementById('data').value;
    const consumo = document.getElementById('consumo').value;
    const nomeColaborador = "Damaris"; // Pode ser dinâmico se necessário

    if (data && consumo) {
        registros.push({ data, nomeColaborador, consumo });
        atualizarTabela();
        limparFormulario();
    }
}

function atualizarTabela() {
    const tbody = document.querySelector('#registrosTable tbody');
    tbody.innerHTML = '';
    registros.forEach((registro, index) => {
        const resultadoConsumo = index > 0 ? registro.consumo - registros[index - 1].consumo : 0;
        const row = `<tr>
            <td>${registro.data}</td>
            <td>${registro.nomeColaborador}</td>
            <td>${registro.consumo}</td>
            <td>${resultadoConsumo}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function limparFormulario() {
    document.getElementById('data').value = '';
    document.getElementById('consumo').value = '';
}

function exportarParaExcel() {
    const csvRows = [];
    const headers = ['Data', 'Nome do Colaborador', 'Consumo Diário', 'Resultado do Consumo'];
    csvRows.push(headers.join(','));

    registros.forEach((registro, index) => {
        const resultadoConsumo = index > 0 ? registro.consumo - registros[index - 1].consumo : 0;
        const row = [registro.data, registro.nomeColaborador, registro.consumo, resultadoConsumo];
        csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'registros.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
