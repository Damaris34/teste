let registros = [];

function adicionarRegistro() {
    const data = document.getElementById('data').value;
    const nomeColaborador = document.getElementById('nomeColaborador').value;
    const consumo = parseFloat(document.getElementById('consumo').value);

    if (data && nomeColaborador && !isNaN(consumo)) {
        registros.push({ data, nomeColaborador, consumo });
        atualizarTabela();
        atualizarGrafico();
        limparFormulario();
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

function atualizarTabela() {
    const tbody = document.querySelector('#registrosTable tbody');
    tbody.innerHTML = '';
    registros.forEach((registro, index) => {
        const variacaoDiaria = index > 0 ? registro.consumo - registros[index - 1].consumo : 0;
        const row = `<tr>
            <td>${registro.data}</td>
            <td>${registro.nomeColaborador}</td>
            <td>${registro.consumo.toFixed(2)}</td>
            <td>${variacaoDiaria.toFixed(2)}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function atualizarGrafico() {
    const ctx = document.getElementById('consumoChart').getContext('2d');

    const labels = registros.map(registro => registro.data);
    const data = registros.map(registro => registro.consumo);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Consumo Diário (kWh)',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }
            }
        }
    });
}

function limparFormulario() {
    document.getElementById('data').value = '';
    document.getElementById('nomeColaborador').value = '';
    document.getElementById('consumo').value = '';
}

function exportarParaExcel() {
    const csvRows = [];
    const headers = ['Data', 'Colaborador', 'Consumo (kWh)', 'Variação Diária (kWh)'];
    csvRows.push(headers.join(','));

    registros.forEach((registro, index) => {
        const variacaoDiaria = index > 0 ? registro.consumo - registros[index - 1].consumo : 0;
        const row = [registro.data, registro.nomeColaborador, registro.consumo, variacaoDiaria];
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
