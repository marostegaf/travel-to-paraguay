// settings.html
const formSettings = document.querySelector("#settings-form");

if (formSettings) {
    formSettings.addEventListener("submit", (event) => {
    event.preventDefault();

    const configuracoes = {
        spread: Number(document.querySelector("#spread").value),
        iof: Number(document.querySelector("#iof").value),
        ptax: Number(document.querySelector("#ptax").value)
    }

    localStorage.setItem(
        "settings",
        JSON.stringify(configuracoes)
    )

    window.location.href = "index.html";
    });
}

// index.html
const settings = localStorage.getItem("settings");

const configuracoesPadrao = {
    spread: 0,
    iof: 0,
    ptax: null
};

const settingsUser = settings
    ? JSON.parse(settings)
    : configuracoesPadrao;

function colocarValorNoElemento(valor, elemento) {
    elementoModificado = document.querySelector(elemento);

    elemento === "#spread" || elemento === "#iof" ? elementoModificado.innerText = valor + "%" : elementoModificado.innerText = "R$ " + valor.toFixed(3);
};

async function buscarPtax() {
    const hoje = new Date();

    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();

    const data = `${mes}-${dia}-${ano}`;

    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$format=json`;

    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (!dados.value || dados.value.length === 0) {
        throw new Error("Nenhuma cotação encontrada para esta data.");
    }

    return dados.value[0].cotacaoVenda;
}

if (settings) {
    colocarValorNoElemento(settingsUser.spread, "#spread")
    colocarValorNoElemento(settingsUser.iof, "#iof")
    colocarValorNoElemento(settingsUser.ptax, "#ptax")
};

const formCalculo = document.querySelector("#form-calculo");

if (formCalculo) {
    formCalculo.addEventListener("submit", async (event) => {
        event.preventDefault();

        const valor = Number(document.querySelector("#valor").value);

        let spread = 0;
        let iof = 0;
        let ptax = 4;

        if (settings) {
            spread = settingsUser.spread;
            iof = settingsUser.iof;
            ptax = settingsUser.ptax;
        } else {
            try {
                ptax = await buscarPtax();
                colocarValorNoElemento(ptax, "#ptax")

            } catch (erro) {
                console.log("Erro ao buscar o PTAX de hoje: ", erro);
            }
        }

        const valorComSpread = valor * (1 + spread / 100);
        const taxaSpread = valorComSpread - valor;

        const valorComIOF = valorComSpread * (1 + iof / 100);
        const taxaIof = valorComIOF - valorComSpread;

        const valorEmReais = valorComIOF * ptax;

         document.querySelector("#spreadConvertido").innerText =
            `R$ ${taxaSpread.toFixed(2)}`;

        document.querySelector("#iofConvertido").innerText =
            `R$ ${taxaIof.toFixed(2)}`;

        document.querySelector("#dolar").innerText =
            `${valor.toFixed(2)}`;

        document.querySelector("#real").innerText =
             `${valorEmReais.toFixed(2)}`
    })
};
