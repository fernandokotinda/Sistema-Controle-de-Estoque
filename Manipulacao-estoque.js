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

// Adicionar tabela
let addProduct = document.getElementById("addProduct");
let downloadButton = document.getElementById("downloadButton");
let popUp = document.getElementById("popUp");
let exitPopUp = document.getElementById("fecharPopUp");
let message = document.querySelector(".popUpMessage");
let messageConfirmation = document.querySelector('.popUpMessageConfirmation');
let ok = document.querySelector("#ok");
let popUpConfirmation = document.querySelector('#popUpConfirmation');



addProduct.addEventListener('click', (ev) => {

        let name = document.querySelector('#productName').value;
        let nameInput = document.querySelector('#productName');
        let productQuantity = document.querySelector('#productQuantity').value;
        let productQuantityInput = document.querySelector('#productQuantity');
        let select = document.getElementById('type');
        let selectValue = document.querySelector('#type').value;
        let code = document.getElementById('cod').value;
        let codeInput = document.getElementById('cod');
        let regex = /^[1-9]\d*$/;
        let regexCode = /^[0-9]\d*$/;
        
        //Verificação formulário
        if(name !== '' && code !== '' && productQuantity !== '' && !productQuantityInput.classList.contains('erro') && !codeInput.classList.contains('erro')) {
            
            ev.preventDefault();
            
            function errorQuantity() {

                message.textContent = "Digite apenas números inteiros maiores que 0.";
                productQuantityInput.classList.add('erro');
                popUp.style.display = "block";

                exitPopUp.addEventListener("click", function () { exitQuantity() });
                ok.addEventListener("click", function () { exitQuantity() });
                
                function exitQuantity() {
                    
                    popUp.style.display = "none";
                    productQuantityInput.classList.remove('erro');
                    document.getElementById('productQuantity').value = '';
                    
                    if (selectValue !== 'Tipo') { select.style.color = 'white'; document.querySelector('#type').value = selectValue };
                    if (regexCode.test(code)) { document.getElementById('cod').value = code };
                    if (!code.length < 6) { document.getElementById('cod').value = code };
                    
                    if (selectValue === 'Tipo') {
                        errorType();
                    } else if (code.length < 6) {
                        errorCodeLength();
                    } else if (!regexCode.test(code)) {
                        errorCodeRegex();
                    }

                }

            }

            function errorType() {

                message.textContent = "Por favor, Escolha qual o tipo do Produto.";
                select.classList.add('erro');
                popUp.style.display = "block";
                

                exitPopUp.addEventListener("click", function () { exitType() });
                ok.addEventListener("click", function () { exitType() });

                function exitType() {

                    popUp.style.display = "none";
                    select.classList.remove('erro');
                    select.value = 'Tipo';
                    select.style.color = 'gray'
                    
                    if (regex.test(productQuantity)) { document.querySelector('#productQuantity').value = productQuantity };
                    if (regexCode.test(code)) { document.getElementById('cod').value = code }
                    if (!(code.length < 6)) { document.getElementById('cod').value = code }
                    
                    if (code.length < 6) {
                        errorCodeLength();
                    } else if (!regexCode.test(code)) {
                        errorCodeRegex();
                    }
                    
                }
            }


            function errorCodeLength() {

                message.textContent = "O código deve conter exatos 6 números.";
                codeInput.classList.add('erro')
                popUp.style.display = "block";
                
                exitPopUp.addEventListener("click", function () { exitCodeLength() });
                ok.addEventListener("click", function () { exitCodeLength() });
                
                function exitCodeLength() {
                    
                    popUp.style.display = "none";
                    codeInput.classList.remove('erro')
                    document.getElementById('cod').value = '';
                    
                    if (selectValue !== 'Tipo') { select.style.color = 'white'; document.querySelector('#type').value = selectValue };
                    if (regex.test(productQuantity)) { document.querySelector('#productQuantity').value = productQuantity };
                    
                    if (!regexCode.test(code)) { errorCodeRegex() };
                    
                }

                
            }

            function errorCodeRegex() {
                
                message.textContent = "O código deve conter apenas números inteiros maiores que 0.";
                codeInput.classList.add('erro')
                popUp.style.display = "block";
                
                exitPopUp.addEventListener("click", function () { exitCodeRegex() });
                ok.addEventListener("click", function () { exitCodeRegex() });
                
                function exitCodeRegex() {
                    
                    popUp.style.display = "none";
                    codeInput.classList.remove('erro')
                    document.getElementById('cod').value = '';

                    if (selectValue !== 'Tipo') { select.style.color = 'white'; document.querySelector('#type').value = selectValue };
                    if (regex.test(productQuantity)) { document.querySelector('#productQuantity').value = productQuantity };
                    
                }


            }

            if (!regex.test(productQuantity)) {

                errorQuantity();

            } else if (selectValue === 'Tipo') {
                
                errorType();
                
            } else if (code.length < 6) {
                
                errorCodeLength();
                
            } else if (!regexCode.test(code)) {
                
                errorCodeRegex();
                
            }
            
            //Adicionando tabela
            if(regex.test(productQuantity) && selectValue !== 'Tipo' && !(code.length < 6) && regexCode.test(code)) {
                
                let sim = document.querySelector('#sim');
                let nao = document.querySelector('#nao');
                let exitPopUpConfirmation = document.querySelector('#fecharPopUpConfirmation');
                
                popUpConfirmation.style.display = 'block';
                messageConfirmation.innerHTML = `Tem certeza que deseja adicionar este produto: <br> <br>
                <font color = '#9aaed9'><strong>Nome do produto:</strong></font>  ${name} <br>
                <font color = '#9aaed9'><strong>Quantidade:</strong></font>  ${productQuantity} <br>
                <font color = '#9aaed9'><strong>Tipo:</strong></font>  ${selectValue} <br>
                <font color = '#9aaed9'><strong>Código:</strong></font>  ${code} <br>`
                
                
                sim.addEventListener('click', function () {adicionar()});

                exitPopUpConfirmation.addEventListener('click', () => {cancelar()});
        
                nao.addEventListener('click', () => { cancelar()});

            }    
        }  
    });

//NÃO   
function cancelar() {
    
    popUpConfirmation.style.display = "none";

    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('type').value = 'Tipo';
    document.getElementById('type').style.color = 'gray'
    document.getElementById('cod').value = '';
    
    nameInput.focus();
    
}

//SIM
function adicionar() {
    let name = document.querySelector('#productName').value;
    let nameInput = document.querySelector('#productName');
    let productQuantity = document.querySelector('#productQuantity').value;
    let selectValue = document.querySelector('#type').value;
    let code = document.getElementById('cod').value;
    let addProduct = document.getElementById("addProduct");
    let tbody = document.querySelector('.estoque-dados');

    
    popUpConfirmation.style.display = 'none'
    
        if (document.querySelectorAll('#estoque tbody tr').length === 0) {
    
            function createTable() {
                
                let theadStock = document.querySelector('#estoque thead');
                let trThead = document.createElement('tr');
                theadStock.append(trThead);
                
                let produto = document.createElement('th');
                produto.setAttribute('scope', 'col');
                produto.innerText = 'Produto'
                
                let quantidade = document.createElement('th');
                quantidade.setAttribute('scope', 'col');
                quantidade.innerText = 'Quantidade'
                
                let tipoProduto = document.createElement('th');
                tipoProduto.setAttribute('scope', 'col');
                tipoProduto.innerText = 'Tipo';
                
                let codigoProduto = document.createElement('th');
                codigoProduto.setAttribute('scope', 'col');
                codigoProduto.innerText = 'Código';
                
                trThead.append(produto, quantidade, tipoProduto, codigoProduto)
                
            }
            createTable();
        }
        
        let tr = document.createElement('tr');
        tr.classList.add(name);
        tbody.appendChild(tr);
        
        let item = document.createElement('td');
        item.classList.add('item');
        item.innerText = name;
        
        let quantity = document.createElement('td');
        quantity.classList.add('quantity');
        quantity.innerText = productQuantity;
        
        let type = document.createElement('td');
        type.classList.add('tipo')
        type.innerText = selectValue;
        
        let codigo = document.createElement('td');
        codigo.classList.add('codigo');
        codigo.innerText = code;
        
        tr.append(item, quantity, type, codigo)
        
        togglePopUpTable();
        
        
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        document.getElementById('type').value = 'Tipo';
        document.getElementById('type').style.color = 'gray'
        document.getElementById('cod').value = '';
        
        
        addProduct.disabled = true;
        const originalText = addProduct.innerHTML; 
        
        addProduct.innerHTML = "Produto adicionado! ✔";
        
        setTimeout(function () {
            addProduct.disabled = false;
            addProduct.innerHTML = originalText; 
        }, 1800); 
        
        nameInput.focus();
    
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

//Possui algum dado na tabela  
function togglePopUpTable() {
    let stockTableRows = document.querySelectorAll('#estoque tbody tr');
    let retiredTableRows = document.querySelectorAll('#retirada tbody tr');
    let popUpTable = document.getElementById("popUpTable");
    let messageTable = document.querySelector('.popUpMessageTable');
    let tabelaOverflow = document.querySelector('.tabela');

    // Verifica se ambas as tabelas estão vazias
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

    }
}




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