const mostrarResp = document.querySelector(".botao_front");
const acertei = document.querySelector("#acertei");
const errei = document.querySelector("#errei");
const front = document.querySelector(".front");
const back = document.querySelector(".back");
const localStorag = localStorage.getItem('dbfunc');
let dbfuncObj = JSON.parse(localStorag);
let cont = 0;

if (dbfuncObj.length >= cont) {
  frente.innerHTML = 'ADICIONE UMA CARTA';
}

frente.innerHTML = `${dbfuncObj[cont].frente}`
verso.innerHTML = `${dbfuncObj[cont].verso}`


mostrarResp.addEventListener("mousedown", virar);
acertei.addEventListener("mousedown", desvirar);
errei.addEventListener("mousedown", desvirar);

function virar() {
  front.style.transform = "rotateY(180deg)";
  back.style.transform = "rotateY(360deg)";

}

function desvirar() {
  cont++
  front.style.transform = "rotateY(0deg)";
  back.style.transform = "rotateY(180deg)";
  console.log(cont, dbfuncObj.length)
  if (cont >= dbfuncObj.length) {
    frente.innerHTML = 'ACABARAM AS CARTAS';
    verso.innerHTML = 'ACABARAM AS CARTAS';
  } else {
    frente.innerHTML = `${dbfuncObj[cont].frente}`;
    verso.innerHTML = `${dbfuncObj[cont].verso}`;
  }
}



