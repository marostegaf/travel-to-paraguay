const url = window.location.search;
const parametros = new URLSearchParams(url);
const valor = parametros.get("valor");

const dolarAmericano = document.querySelector("#dolar");
dolarAmericano.innerText = valor;

const realBrasileiro = document.querySelector("#real");

function realizarCalculoDeValorConvertido(valor, spread, iof, ptax) {
    return valorFinal = valor * ptax * (1 + spread / 100) * (1 + iof / 100);
}

realBrasileiro.innerText = realizarCalculoDeValorConvertido(valor, 0, 3.5, 5.20).toFixed(2);