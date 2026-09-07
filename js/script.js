const form = document.querySelector("#settings-form");

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

    console.log(configuracoes);
});