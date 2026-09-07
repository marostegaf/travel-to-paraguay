// settings.html
const form = document.querySelector("#settings-form");

if (form) {
    form.addEventListener("submit", (event) => {
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

function colocarValorNoElemento(valor, elemento) {
    elementoModificado = document.querySelector(elemento);

    if (elemento === "#spread" || elemento === "#iof") {
        elementoModificado.innerText = valor + "%"
    } else {
        elementoModificado.innerText = "R$ " + valor.toFixed(2);
    }
}

if (settings) {
    const settingsUser = JSON.parse(settings)

    const spread = settingsUser.spread;
    colocarValorNoElemento(spread, "#spread")
    const iof = settingsUser.iof;
    colocarValorNoElemento(iof, "#iof")
    const ptax = settingsUser.ptax;
    colocarValorNoElemento(ptax, "#ptax")
}
