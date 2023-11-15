//Mudar cor no select
let selectElement = document.getElementById("type");

selectElement.addEventListener("change", function () {
    let selectedOption = selectElement.options[selectElement.selectedIndex];

    if (selectedOption.classList.contains("white")) {
        selectElement.style.color = "white";
    } else {
        selectElement.style.color = "gray"; 
    }
});

//PopUp e download
let downloadButton = document.getElementById("downloadButton");
let popUp = document.getElementById("popUp");
let exitPopUp = document.getElementById("fecharPopUp");
let message = document.querySelector(".popUpMessage");
let messageConfirmation = document.querySelector('.popUpMessageConfirmation');
let ok = document.querySelector("#ok");
let popUpConfirmation = document.querySelector('#popUpConfirmation');

//Possui algum dado na tabela  
function togglePopUpTable() {
    let stockTableRows = document.querySelectorAll('#estoque tbody tr');
    let retiredTableRows = document.querySelectorAll('#retirada tbody tr');
    let popUpTable = document.getElementById("popUpTable");
    let messageTable = document.querySelector('.popUpMessageTable');
    let tabelaOverflow = document.querySelector('.tabela');


    if (stockTableRows.length === 0) {

        popUpTable.style.display = 'block';
        messageTable.textContent = 'Nenhum produto foi adicionado ao estoque!';
        tabelaOverflow.style.overflowY = 'hidden';
        tabelaOverflow.style.boxShadow = 'none';

    } else {

        popUpTable.style.display = 'none';
        tabelaOverflow.style.overflowY = 'auto';
        tabelaOverflow.style.boxShadow = 'rgba(255, 255, 255, 0.332) 3px 3px 20px 0px';

    }

    if(retiredTableRows.length === 0 && stockTable.style.display === 'none') {

        popUpTable.style.display = 'block';
        messageTable.textContent = 'Nenhum produto foi retirado do estoque!';
        tabelaOverflow.style.overflowY = 'hidden';
        tabelaOverflow.style.boxShadow = 'none';
 
    } else {

        popUpTable.style.display = 'none';
        tabelaOverflow.style.overflowY = 'auto';
        tabelaOverflow.style.boxShadow = 'rgba(255, 255, 255, 0.332) 3px 3px 20px 0px';
    }

    if(stockTableRows.length === 0 && retiredTable.style.display === 'none') {

        popUpTable.style.display = 'block';
        messageTable.textContent = 'Nenhum produto foi adicionado ao estoque!';
        tabelaOverflow.style.overflowY = 'hidden';
        tabelaOverflow.style.boxShadow = 'none';
    }

}

//Escolher Tabela
let seeStockTable = document.querySelector('.stock');
let seeRetiredTable = document.querySelector('.retired');
let stockTable = document.getElementById('estoque');
let retiredTable = document.getElementById('retirada')

seeStockTable.addEventListener('click', () => {
    
    stockTable.style.display = 'block';
    retiredTable.style.display = 'none';
    seeRetiredTable.classList.remove('selected');
    seeStockTable.classList.add('selected');

    togglePopUpTable();
    
    
})
seeRetiredTable.addEventListener('click', () => {

    retiredTable.style.display = 'block';
    stockTable.style.display = 'none';
    seeStockTable.classList.remove('selected');
    seeRetiredTable.classList.add('selected');

    togglePopUpTable();
    
})



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

    togglePopUpTable();
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

let productsStock = [];
let productsRetired = [];

function arrayStock() {

    let name = document.querySelector('#productName').value;
    let productQuantity = document.querySelector('#productQuantity').value;
    let selectValue = document.querySelector('#type').value;
    let code = document.getElementById('cod').value;

    let propProductsStock = {

        name: name,
        productQuantity: productQuantity,
        selectValue: selectValue,
        code: code,

    }
    productsStock.push(propProductsStock);
    console.log(productsStock)

}
function arrayRetired() {

    let name = document.querySelector('#productName').value;
    let productQuantity = document.querySelector('#productQuantity').value;
    let selectValue = document.querySelector('#type').value;
    let code = document.getElementById('cod').value;
    let receiver = document.getElementById('receiver').value;
    
    let propProductsRetired = {
    
        name: name,
        productQuantity: productQuantity,
        selectValue: selectValue,
        code: code,
        receiver: receiver,
    
    }
    productsRetired.push(propProductsRetired);
    console.log(productsRetired)

}




