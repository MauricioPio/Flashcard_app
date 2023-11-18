const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sId = document.querySelector('#m-nome')
const sFrente = document.querySelector('#m-funcao')
const sVerso = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')
const teste = localStorage.getItem('dbfunc')

let itens
let id
let idCounter = 0;


function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if (edit) {
        sId.value = itens[index].id
        sFrente.value = itens[index].frente
        sVerso.value = itens[index].verso
        id = index
    } else {
        sId.value = generateUniqueId()
        sFrente.value = ''
        sVerso.value = ''
    }

}

function generateUniqueId() {
    idCounter++;
    return idCounter;
}

function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.id}</td>
    <td>${item.frente}</td>
    <td>${item.verso}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

    if (sId.value == '' || sFrente.value == '' || sVerso.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].id = sId.value
        itens[id].frente = sFrente.value
        itens[id].verso = sVerso.value
    } else {
        itens.push({ 'id': sId.value, 'frente': sFrente.value, 'verso': sVerso.value })
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()