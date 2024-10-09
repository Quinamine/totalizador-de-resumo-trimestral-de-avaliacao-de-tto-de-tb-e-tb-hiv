"use strict"
const referencia = {
    retornarIndicador(inputTarget) {
        const indicadorOutput = document.querySelector(".reference__output--indicador");
        const celulaComFocoEirmas = inputTarget.parentElement.children;
        let indicadores = inputTarget.parentElement.parentElement.children[0].querySelectorAll("span");
        let tituloDaSeccao = inputTarget.parentElement.parentElement.previousElementSibling;
        let isSection1 = inputTarget.parentElement.parentElement.matches(".ficha__seccao__body--1");
        if(isSection1) {
            tituloDaSeccao = document.getElementById("titulo-da-seccao-1");
        }
        let celulaFocadaIndex;        
        for(let i = 0; i < celulaComFocoEirmas.length; i++) {
            if(inputTarget === celulaComFocoEirmas[i]) {
                celulaFocadaIndex = i;
            }
        }
        indicadorOutput.textContent = `${tituloDaSeccao.textContent}: ${indicadores[celulaFocadaIndex].textContent}`;
    },
    retornarColuna(inputTarget) {
        const colunaOutput = document.querySelector(".reference__output--idade");
        let colunas = document.querySelectorAll(".seccao-1__header__linha-de-indicadores span");
        let isSection1 = inputTarget.parentElement.parentElement.matches(".ficha__seccao__body--1");
        if(isSection1) {
            let inputTargetParentAndUncles = document.querySelectorAll(".ficha__seccao__body--1 > div");
            let indexOfInputTargetParent;        
            for(let i = 0; i < inputTargetParentAndUncles.length; i++) {
                if(inputTarget.parentElement === inputTargetParentAndUncles[i]) {
                    indexOfInputTargetParent = i - 1;
                }
            }
            colunaOutput.textContent = colunas[indexOfInputTargetParent].textContent;
        } else {
            colunaOutput.textContent = inputTarget.parentElement.children[0].textContent;
        }
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
                referencia.retornarIndicador(inputCelular);
                referencia.retornarColuna(inputCelular)
            }
        });
    });
    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}
window.onload = events;