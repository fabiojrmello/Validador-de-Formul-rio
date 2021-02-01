let B7Validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        // Limpar mensagens de erro, se houver
        B7Validator.clearErrors();

        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i];
            // Retorna true ou a mensagem de erro
            let check = B7Validator.checkInput(input);
            if(check !== true){
                // Exibe o
                send = false;
                B7Validator.showError(input, check);
            }
        }

        //send = false;
        if(send){
            form.submit();
        }
    },

    checkInput:(input) =>  {
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            // Separa as regras
            rules = rules.split('|');
            for( let contador in rules){
                let rDetails = rules[contador].split('=');
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo não pode ser vazio.';   
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo têm que ter pelo menos '+rDetails[1]+' caracteres';
                        }
                    break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                               return 'E-mail digitado mão é válido.'; 
                            }
                        }
                    break;
                }
            }
        }

        return true;
    },

    showError:(input, error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },

    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style = '';
        }
        
        let errorElements = document.querySelectorAll('.error');
        for(let i = 0; i < errorElements.length; i++){
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);