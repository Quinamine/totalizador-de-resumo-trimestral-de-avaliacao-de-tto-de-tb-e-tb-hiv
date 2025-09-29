"use strict"
const referencia = {
    retornarLinha(inputTarget) {
        const indicadorOutput = document.querySelector(".reference__output--indicador");
        let tituloDaSeccao = inputTarget.parentElement.parentElement.querySelector("h2").textContent.toUpperCase();
        let indicadorLinear = inputTarget.parentElement.children[0].textContent;
        indicadorOutput.textContent = `${tituloDaSeccao}: ${indicadorLinear}`;
    },
    retornarColuna(inputTarget) {
        const colunaOutput = document.querySelector(".reference__output--idade");
        let colunas = document.querySelectorAll(".ficha__seccao__header span");
        let isSection1 = inputTarget.parentElement.matches(".ficha__linha-de-indicador--s1");
        if(isSection1) {
            colunas = document.querySelectorAll(".seccao-1__header__linha-de-indicadores span");
        }
        let inputTargetIndex, inputTargetAndSiblings = inputTarget.parentElement.children;
        for(let i = 0; i < inputTargetAndSiblings.length; i++) {
            if(inputTargetAndSiblings[i] === inputTarget) inputTargetIndex = i - 1;
        }
        colunaOutput.textContent = colunas[inputTargetIndex].textContent;
    },
    retornarVazio() {
        const outputs = document.querySelectorAll(".reference__output");
        for (const o of outputs) o.value = "";
    }
}
function events() {
    const inputsCelulares = document.querySelectorAll(".ficha__seccao input");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {
            if(!inputCelular.matches("[readonly]")) {
                referencia.retornarLinha(inputCelular);
                referencia.retornarColuna(inputCelular)
            }
        });
    });
    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}
window.onload = events;