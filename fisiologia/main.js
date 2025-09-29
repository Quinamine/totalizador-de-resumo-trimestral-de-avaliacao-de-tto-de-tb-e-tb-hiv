"use strict"
const backup = {
    saveGridInputs() {
        const inputsCelulares = document.querySelectorAll(".ficha__seccao input");
        for (let i = 0; i < inputsCelulares.length; i++) {
            inputsCelulares[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            });
            inputsCelulares[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
    },
    saveExtraInputs() {
        const inputsNaoCelulares = document.querySelectorAll(".input-nao-celular");
        const campoDeObs = document.querySelector(".obs__input");
        inputsNaoCelulares.forEach( inputTarget => {
            inputTarget.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${inputTarget.id}`, inputTarget.value));
            inputTarget.value = localStorage.getItem(`${keyPrefix}-${inputTarget.id}`);
        });
        campoDeObs.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-input-obs`, campoDeObs.textContent));
        campoDeObs.textContent = localStorage.getItem(`${keyPrefix}-input-obs`);
    }
}
const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
        if(inputTarget.dataset.totaleixox) {
            let classNameDosOperandos = inputTarget.dataset.totaleixox;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            const operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            const celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaleixoxoutput}`);
            const celulaDeSaida2 = document.querySelector(`.${inputTarget.dataset.totalcolsec1output}`);
            celulaDeSaida.value = this.somar(operandos); 
            celulaDeSaida2.value = this.somar(operandos); 
        }     
        if(inputTarget.dataset.totald) {
            let classNameDosOperandos = inputTarget.dataset.totald;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            const operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            const celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaldoutput}`);
            celulaDeSaida.value = this.somar(operandos);  
        }
        if(inputTarget.dataset.tbna) {
            let classNameDosOperandos = inputTarget.dataset.tbna;
            let classNameDeNotificados = classNameDosOperandos.split("-minus-")[0];
            let classNameDosAvaliados = classNameDosOperandos.split("-minus-")[1];
            const notificados = document.querySelector(`.${classNameDeNotificados}`);
            const avaliados = document.querySelector(`.${classNameDosAvaliados}`);
            let naoAvaliados = notificados.value - avaliados.value;
            let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.tbnaoutput}`);
            celulaDeSaida.value = naoAvaliados;
        }
        if(inputTarget.dataset.totaltbna) {
            let classNameDosOperandos = inputTarget.dataset.totaltbna;
            let classNameDeNotificados = classNameDosOperandos.split("-minus-")[0];
            let classNameDosAvaliados = classNameDosOperandos.split("-minus-")[1];
            const notificados = document.querySelector(`.${classNameDeNotificados}`);
            const avaliados = document.querySelector(`.${classNameDosAvaliados}`);
            let naoAvaliados = notificados.value - avaliados.value;
            let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaltbnaoutput}`);
            celulaDeSaida.value = naoAvaliados;
        }
    },
    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    },
}
function escutarEventos() {
    const inputsCelulares = document.querySelectorAll("[data-totaleixox], [data-totald]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("input", () => totalizador.filtrarEtotalizarCelulas(inputCelular));
        inputCelular.value !== "" && totalizador.filtrarEtotalizarCelulas(inputCelular);
    });
}
window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




