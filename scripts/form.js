var alerta= document.getElementById("alertaForm");
console.log(alerta)

function validarformulario(){
    var validacion = true;
    var nombreUsuario = document.getElementById("idName");
    
    if (nombreUsuario.value == ""){
        validacion = false;
        nombreUsuario.classList.add('is-invalid');
    }
    else{
        validacion = true;
        nombreUsuario.classList.remove('is-invalid');
    }

    if(validacion==ture){
        alerta.style.display = 'none';
    }else{
        alerta.style.display = 'block';
    }
}