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
        if(regex.test(productQuantity) && selectValue !== 'Tipo' && !(code.length < 6) && regexCode.test(code)) {

                let sim = document.querySelector('#sim');
                let nao = document.querySelector('#nao');
                let exitPopUpConfirmation = document.querySelector('#fecharPopUpConfirmation');
                
                popUpConfirmation.style.display = 'block';
                messageConfirmation.innerHTML = `Tem certeza que deseja <strong>retirar</strong> este produto: <br> <br>
                <font color = '#9aaed9'><strong>Nome do produto:</strong></font>  ${name} <br>
                <font color = '#9aaed9'><strong>Quantidade:</strong></font>  ${productQuantity} <br>
                <font color = '#9aaed9'><strong>Tipo:</strong></font>  ${selectValue} <br>
                <font color = '#9aaed9'><strong>Código:</strong></font>  ${code} <br>`
    
                let removeProduct = document.getElementById("removeProduct");
                    removeProduct.disabled = true;
                    const originalText = removeProduct.innerHTML; 
                    
                    removeProduct.innerHTML = "Produto removido! ✔";
                    
                    setTimeout(function () {
                        removeProduct.disabled = false;
                        removeProduct.innerHTML = originalText; 
                    }, 2000); 
                
                
                sim.addEventListener('click', function () {retirar()});
    
                exitPopUpConfirmation.addEventListener('click', () => {cancelar()});
        
                nao.addEventListener('click', () => { cancelar()});
                

        };
    };
});

//NÃO   
function cancelar() {

    let nameInput = document.querySelector('#productName');

    popUpConfirmation.style.display = "none";

    let removeProduct = document.getElementById("removeProduct");
        removeProduct.disabled = true;
        const originalText = 'Remover do Estoque'; 
        
        removeProduct.innerHTML = "Remoção do produto cancelado!";
        
        setTimeout(function () {
            removeProduct.disabled = false;
            removeProduct.innerHTML = originalText; 
        }, 2000);

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

    let nameInput = document.querySelector('#productName');
    let tbody = document.querySelector('.retirada-dados')

    
    popUpConfirmation.style.display = 'none'
    
    
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

function loadFromLocalStorage() {
    const storedProducts = localStorage.getItem('productsStock');
    if (storedProducts) {
        productsStock = JSON.parse(storedProducts);
        updateTableStock();
    }
}

window.onload = function () {
    
    let tableStock = document.querySelector('#estoque');
    tableStock.style.display = 'none';
    
    loadFromLocalStorage();


}
        

function updateTableStock() {
    
    const tbody = document.querySelector('.estoque-dados');
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

    saveToLocalStorageBack();

    console.log(productsStock)
}

function saveToLocalStorage() {
    localStorage.setItem('productsStock', JSON.stringify(productsStock));
}



