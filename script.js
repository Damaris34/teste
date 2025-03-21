let registros = [];

function adicionarRegistro() {
    const data = document.getElementById('data').value;
    const consumo = document.getElementById('consumo').value;

    if (data && consumo) {
        registros.push({ data, consumo });
        atualizarTabela();
        limparFormulario();
    }
}

function atualizarTabela() {
    const tbody = document.querySelector('#registrosTable tbody');
    tbody.innerHTML = '';
    registros.forEach((registro, index) => {
        const row = `<tr>
            <td>${registro.data}</td>
            <td>${registro.consumo}</td>
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
    const headers = ['Data', 'Consumo Diário'];
    csvRows.push(headers.join(','));

    registros.forEach(registro => {
        const row = [registro.data, registro.consumo];
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
