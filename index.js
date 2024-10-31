const idConselho = document.getElementById('numeracao-conselho')
const descricaoConselho = document.getElementById('descricao-conselho')
const botao = document.getElementById('clicador')


async function geradorDeConselhos() {
    try {
        const resposta = await fetch('https://api.adviceslip.com/advice');

        if (!resposta.ok){
            throw new Error("Ocorreu um erro ao tentar buscar as informações da API");
        }

        const dados = await resposta.json();


        const textoConselho = dados.slip.advice;
        const conselhoTraduzido = await traduzirConselho(textoConselho);


        idConselho.innerText = `conselho  #${dados.slip.id}`;
        descricaoConselho.innerText = `"${conselhoTraduzido}"`;

    } catch (error) {
        console.error("Erro ao buscar conselho:", error);
        descricaoConselho.innerText = "Erro ao buscar conselho. Tente novamente.";
    }

}



async function traduzirConselho(texto) {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (erro) {
        console.error("Erro ao traduzir conselho:", erro);
        return texto;
    }
}

botao.addEventListener('click', geradorDeConselhos)