document.getElementById('consultar').addEventListener('click', async () => {
    const cep = document.getElementById('cep').value;
    const loading = document.getElementById('loading');
    const resultado = document.getElementById('resultado');

    if (!cep) {
        alert('Por favor, insira um CEP.');
        return;
    }

    loading.classList.remove('hidden');
    resultado.classList.add('hidden');

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            resultado.innerHTML = 'CEP não encontrado.';
        } else {
            resultado.innerHTML = `
                <table>
                    <tr><td>Logradouro:</td><td>${data.logradouro}</td></tr>
                    <tr><td>Bairro:</td><td>${data.bairro}</td></tr>
                    <tr><td>Cidade:</td><td>${data.localidade}</td></tr>
                    <tr><td>UF:</td><td>${data.uf}</td></tr>
                </table>
            `;
        }
    } catch (error) {
        resultado.innerHTML = 'Erro ao buscar o CEP.';
    } finally {
        loading.classList.add('hidden');
        resultado.classList.remove('hidden');
    }
});
