let registros = [];

function adicionarRegistro() {
    const data = document.getElementById('data').value;
    const quantidade = document.getElementById('quantidade').value;

    if (data && quantidade) {
        registros.push({ data, quantidade });
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
            <td>${registro.quantidade}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function limparFormulario() {
    document.getElementById('data').value = '';
    document.getElementById('quantidade').value = '';
}

function exportarParaExcel() {
    const csvRows = [];
    const headers = ['Data', 'Quantidade'];
    csvRows.push(headers.join(','));

    registros.forEach(registro => {
        const row = [registro.data, registro.quantidade];
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
