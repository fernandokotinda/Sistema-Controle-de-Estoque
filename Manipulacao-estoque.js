
// Adicionar tabela
let addProduct = document.getElementById("addProduct");
let downloadButton = document.getElementById("downloadButton");


    addProduct.addEventListener('click', () => {
        
        let productNameInput = document.getElementById("productName").value;
        let productQuantityInput = document.getElementById("productQuantity").value;
        let select = document.getElementById('type');
        let selectType = document.getElementById('type').value;
        let code = document.getElementById('cod');

        let table = document.getElementById("estoque1");

        let tr = document.createElement('tr');
        table.appendChild(tr);

        let item = document.createElement('td');
        item.classList.add('item');
        item.innerText = productNameInput;

        let quantity = document.createElement('td');
        quantity.classList.add('quantity');
        quantity.innerText = productQuantityInput;

        tr.append(item, quantity)

        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        document.getElementById('type').value = 'Tipo';
        select.style.color = 'gray'
        document.getElementById('cod').value = '';
        

})


//Adiconar janela de aviso
document.getElementById("addProduct").addEventListener("click", function () {
    document.getElementById("popUp").style.display = "block";
});

document.getElementById("fecharPopUp").addEventListener("click", function () {
    document.getElementById("popUp").style.display = "none";
});

document.getElementById("ok").addEventListener("click", function () {
    document.getElementById("popUp").style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("popUp")) {
        document.getElementById("popUp").style.display = "none";
    }
});

//Texto ao clicar para baixar
document.addEventListener("DOMContentLoaded", function () {

    const addButton = document.getElementById("downloadButton");

        addButton.addEventListener("click", function () {
        addButton.disabled = true;
        const originalText = addButton.innerHTML; 

        addButton.innerHTML = "Baixando...";

        setTimeout(function () {
            addButton.innerHTML = "Download Realizado!";

        setTimeout(function () {
            addButton.disabled = false;
            addButton.innerHTML = originalText; 
        }, 1500); 
    }, 1000);

    });
});


//Adicionar botão + e - no input de quantidade
const inputElement = document.getElementById("productQuantity");
const decreaseButton = document.querySelector(".decrease");
const increaseButton = document.querySelector(".increase");

decreaseButton.addEventListener("click", () => {
    const currentValue = parseInt(inputElement.value) || 0;
    inputElement.value = Math.max(0, currentValue - 1);
});

increaseButton.addEventListener("click", () => {
    const currentValue = parseInt(inputElement.value) || 0;
    inputElement.value = currentValue + 1;
});


//Mudar cor no select
const selectElement = document.getElementById("type");
const types = document.querySelector('.gray');

selectElement.addEventListener("change", function () {
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    if (selectedOption.classList.contains("white")) {
        selectElement.style.color = "white";
        types.style.color = "gray";
    } else {
        selectElement.style.color = "gray"; 
    }
});