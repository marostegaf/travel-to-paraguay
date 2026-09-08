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
const settingsUser = JSON.parse(settings)

function colocarValorNoElemento(valor, elemento) {
    elementoModificado = document.querySelector(elemento);

    elemento === "#spread" || elemento === "#iof" ? elementoModificado.innerText = valor + "%" : elementoModificado.innerText = "R$ " + valor.toFixed(2);
};

if (settings) {
    colocarValorNoElemento(settingsUser.spread, "#spread")
    colocarValorNoElemento(settingsUser.iof, "#iof")
    colocarValorNoElemento(settingsUser.ptax, "#ptax")
};

const formCalculo = document.querySelector("#form-calculo");

if (formCalculo) {
    formCalculo.addEventListener("submit", (event) => {
        event.preventDefault();

        const valor = Number(document.querySelector("#valor").value);

        let spread = 0;
        let iof = 0;
        let ptax = 5;

        if (settings) {
            spread = settingsUser.spread;
            iof = settingsUser.iof;
            ptax = settingsUser.ptax;
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