

//Remover produto da tabela
let removeProduct = document.querySelector('#removeProduct');


removeProduct.addEventListener('click', (ev) => {

    let name = document.querySelector('#productName').value;
    let productQuantity = document.querySelector('#productQuantity').value;
    let productQuantityInput = document.querySelector('#productQuantity');
    let select = document.getElementById('type');
    let selectValue = document.querySelector('#type').value;
    let code = document.getElementById('cod').value;
    let codeInput = document.getElementById('cod');
    let receiver = document.getElementById('receiver').value;
    let regex = /^[1-9]\d*$/;
    let regexCode = /^[0-9]\d*$/;
    
    //Verificação formulário
    if(name !== '' && receiver !== ''  && code !== '' && productQuantity !== '' && !productQuantityInput.classList.contains('erro') && !codeInput.classList.contains('erro')) {
        
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
                document.getElementById('productName').value = name;
                document.getElementById('receiver').value = receiver;
                
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
                document.getElementById('productName').value = name;
                document.getElementById('receiver').value = receiver;
                
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
                document.getElementById('productName').value = name;
                document.getElementById('receiver').value = receiver;
                
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
                document.getElementById('productName').value = name;
                document.getElementById('receiver').value = receiver;
            
                
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
        if(regex.test(productQuantity) && selectValue !== 'Tipo' && !(code.length < 6) && regexCode.test(code)) {

            let name = document.getElementById('productName').value;
            let productQuantity = document.getElementById('productQuantity').value;
            let selectValue = document.querySelector('#type').value;
            let code = document.getElementById('cod').value;

            let isProductInStockEqual = productsStock.some(product => (
                
                product.name === name &&
                product.productQuantity === productQuantity &&
                product.selectValue === selectValue &&
                product.code === code

            
            ));
  
            if (!isProductInStockEqual) {
                let ok = document.querySelector("#ok");
                let exitPopUp = document.getElementById("fecharPopUp");

                popUp.style.display = 'block';
                message.innerHTML = 'Não foi encontrado nenhum produto com as informações que você forneceu!'
                ok.addEventListener('click', () => {limpar()})
                exitPopUp.addEventListener('click', () => {limpar()})
            }
         
            // let isProductInStockQuantity = productsStock.some(product => (
                
            //     product.name === name &&
            //     product.productQuantity > productQuantity &&
            //     product.selectValue === selectValue &&
            //     product.code === code

            
            // ));

            // if (!isProductInStockQuantity) {
            //     let ok = document.querySelector("#ok");
            //     let exitPopUp = document.getElementById("fecharPopUp");

            //     popUp.style.display = 'block';
            //     message.innerHTML = 'A quantidade que deseja retirar é insuficiente!'
            //     ok.addEventListener('click', () => {limpar()})
            //     exitPopUp.addEventListener('click', () => {limpar()})
            // }

            if(isProductInStockEqual) {

                let sim = document.querySelector('#sim');
                let nao = document.querySelector('#nao');
                let exitPopUpConfirmation = document.querySelector('#fecharPopUpConfirmation');
    
                
                popUpConfirmation.style.display = 'block';
                messageConfirmation.innerHTML = `Tem certeza que deseja <strong>retirar</strong> este produto: <br> <br>
                <font color = '#9aaed9'><strong>Nome do produto:</strong></font>  ${name} <br>
                <font color = '#9aaed9'><strong>Quantidade:</strong></font>  ${productQuantity} <br>
                <font color = '#9aaed9'><strong>Tipo:</strong></font>  ${selectValue} <br>
                <font color = '#9aaed9'><strong>Código:</strong></font>  ${code} <br>
                <font color = '#9aaed9'><strong>Destinatário:</strong></font> ${receiver} <br>`
    
                let removeProduct = document.getElementById("removeProduct");
                    removeProduct.disabled = true;
                    const originalText = removeProduct.innerHTML; 
                    
                    removeProduct.innerHTML = "Produto removido! ✔";
                    
                    setTimeout(function () {
                        removeProduct.disabled = false;
                        removeProduct.innerHTML = originalText; 
                    }, 2000); 
                    console.log(productsStock)
                
                sim.addEventListener('click', () => {retirar()});
    
                exitPopUpConfirmation.addEventListener('click', () => {cancelar()});
        
                nao.addEventListener('click', () => {cancelar()});
                
            }

        };
    };
});
//LIMPAR 

function cancelar() {

    let nameInput = document.querySelector('#productName');

    popUpConfirmation.style.display = "none";

    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('type').value = 'Tipo';
    document.getElementById('type').style.color = 'gray'
    document.getElementById('cod').value = '';
    document.getElementById('receiver').value = '';

    let removeProduct = document.getElementById("removeProduct");
        removeProduct.disabled = true;
        const originalText = 'Adicionar ao Estoque'; 
        
        removeProduct.innerHTML = "Envio do produto cancelado!";
        
        setTimeout(function () {
            removeProduct.disabled = false;
            removeProduct.innerHTML = originalText; 
        }, 2000);


    
    nameInput.focus();
    
}

function limpar() {

    let nameInput = document.querySelector('#productName');

    popUp.style.display = "none";

    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('type').value = 'Tipo';
    document.getElementById('type').style.color = 'gray'
    document.getElementById('cod').value = '';
    document.getElementById('receiver').value = ''
    
    nameInput.focus();

}
  


//SIM
function retirar() {
    
    let name = document.querySelector('#productName').value;
    let idToRemove;

    popUpConfirmation.style.display = 'none'

    for (let i in productsStock) {
        if (productsStock[i].name === name) {
            idToRemove = productsStock[i].id;
            break;
        }
    }

    productsStock = productsStock.filter(product => product.id !== idToRemove)

    
    updateTableStock();
    adicionarTableRetired();
    location.reload();
    
}


function adicionarTableRetired() {

    let nameInput = document.querySelector('#productName');
    let tbody = document.querySelector('.retirada-dados')

    if (document.querySelectorAll('#retirada tbody tr').length === 0) {
        
        function createTable() {
            
            let theadRetired = document.querySelector('#retirada thead');
            let trThead = document.createElement('tr');
            theadRetired.append(trThead);
            
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

            let destinatarioProduto = document.createElement('th');
            destinatarioProduto.setAttribute('scope', 'col');
            destinatarioProduto.innerText = 'Destinatário'
            
            trThead.append(produto, quantidade, tipoProduto, codigoProduto, destinatarioProduto)
            
        }
        createTable();
    }

    try{

        tbody.innerHTML = ''
        
        productsRetired.forEach((produto) => {

            let tr = document.createElement('tr');
            tr.classList.add(produto.name);
    
            tbody.appendChild(tr);
                
            let item = document.createElement('td');
            item.classList.add('item');
            item.innerText = produto.name;
            
            let quantity = document.createElement('td');
            quantity.classList.add('quantity');
            quantity.innerText = produto.productQuantity;
            
            let type = document.createElement('td');
            type.classList.add('tipo')
            type.innerText = produto.selectValue;
            
            let codigo = document.createElement('td');
            codigo.classList.add('codigo');
            codigo.innerText = produto.code;

            let destinatario = document.createElement('td');
            destinatario.classList.add('destinatario');
            destinatario.innerText = produto.receiver;
            
            tr.append(item, quantity, type, codigo, destinatario)

        })
        
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        document.getElementById('type').value = 'Tipo';
        document.getElementById('type').style.color = 'gray'
        document.getElementById('cod').value = '';
        document.getElementById('receiver').value = '';

        saveToLocalStorageRetired(); //1r
        
        togglePopUpTable();

    
        nameInput.focus();

    } catch {

        console.log('');
    }
       
}


removeProduct.addEventListener('mouseover', () => {

    removeProduct.style.backgroundColor = '#309168'
})

removeProduct.addEventListener('mouseout', () => {

    removeProduct.style.backgroundColor = '#255E46'
});





function updateTableStock() {
    
    const tbody = document.querySelector('.estoque-dados');
    popUpConfirmation.style.display = 'none'

    tbody.innerHTML = '';
    
    productsStock.forEach((produto) => {

        let tr = document.createElement('tr');
        tr.classList.add(produto.name);

        tbody.appendChild(tr);
            
        let item = document.createElement('td');
        item.classList.add('item');
        item.innerText = produto.name;
        
        let quantity = document.createElement('td');
        quantity.classList.add('quantity');
        quantity.innerText = produto.productQuantity;
        
        let type = document.createElement('td');
        type.classList.add('tipo')
        type.innerText = produto.selectValue;
        
        let codigo = document.createElement('td');
        codigo.classList.add('codigo');
        codigo.innerText = produto.code;
        
        tr.append(item, quantity, type, codigo);

            
    });

    let tbodyRows = document.querySelectorAll('#estoque tbody tr');
    let theadRows = document.querySelectorAll('#estoque thead tr');
         
    if (tbodyRows.length >= 1 && theadRows.length === 0) {
    
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
    
    
    if (theadRows.length > 1) {
            
        location.reload();
    }

    saveToLocalStorageBack(); //5s

    console.log(productsStock)
}

function limparStock() {

    localStorage.clear();
    location.reload();
    
}


window.onload = function () {

    let tableStock = document.querySelector('#estoque');
    tableStock.style.display = 'none';

    loadFromLocalStorage(); //3s
    loadFromLocalStorageRetiredBack(); //7r
    
}


function loadFromLocalStorage() {
    const storedProducts = localStorage.getItem('productsStock');
    if (storedProducts) {
        productsStock = JSON.parse(storedProducts);
        updateTableStock(); //4s
    }
}

function saveToLocalStorageBack() {
    localStorage.setItem('productsStock', JSON.stringify(productsStock)); //6s
}




function saveToLocalStorageRetired() {
    localStorage.setItem('productsRetired', JSON.stringify(productsRetired)); //2r
}

function loadFromLocalStorageRetiredBack() {
    const retiredProducts = localStorage.getItem('productsRetired');
    if (retiredProducts) {
        productsRetired = JSON.parse(retiredProducts);
        adicionarTableRetired(); //8r
    }
}


