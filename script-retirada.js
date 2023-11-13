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

    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('type').value = 'Tipo';
    document.getElementById('type').style.color = 'gray'
    document.getElementById('cod').value = '';
    document.getElementById('receiver').value - ''
    
    nameInput.focus();
    
}

removeProduct.addEventListener('mouseover', () => {

    removeProduct.style.backgroundColor = '#309168'
})

removeProduct.addEventListener('mouseout', () => {

    removeProduct.style.backgroundColor = '#255E46'
})

