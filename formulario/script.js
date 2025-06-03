document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();
    if (validarFormulario()) {
        alert("Formulario enviado correctamente.");
    }
});

function limpiarFormulario() {
    var form = document.getElementById("formulario");
    form.reset();
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) {
        errores[i].textContent = "";
    }
    var inputs = document.querySelectorAll("input");
    for (var j = 0; j < inputs.length; j++) {
        inputs[j].classList.remove("error-input");
    }
}

function validarFormulario() {
    var valido = true;

    function mostrarError(id, mensaje) {
        document.getElementById("error-" + id).textContent = mensaje;
        document.getElementById(id).classList.add("error-input");
        valido = false;
    }

    function limpiarError(id) {
        document.getElementById("error-" + id).textContent = "";
        document.getElementById(id).classList.remove("error-input");
    }

    var nombre = document.getElementById("nombre").value.trim();
    if (!nombre) mostrarError("nombre", "El nombre es obligatorio.");
    else limpiarError("nombre");

    var rut = document.getElementById("rut").value.trim();
    if (!rut || !validarRUT(rut)) mostrarError("rut", "RUT inválido.");
    else limpiarError("rut");

    var fecha = document.getElementById("fechaNacimiento").value.trim();
    var fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (fecha && !fechaRegex.test(fecha)) mostrarError("fechaNacimiento", "Formato de fecha inválido.");
    else limpiarError("fechaNacimiento");

    var cv = document.getElementById("cv").value;
    if (cv && !(/\.(pdf|docx)$/i.test(cv))) mostrarError("cv", "Solo se permiten archivos .pdf o .docx.");
    else limpiarError("cv");

    var email = document.getElementById("email").value.trim();
    var emailRegex = /^\S+@\S+\.\S+$/;
    if (!email || !emailRegex.test(email)) mostrarError("email", "Email inválido.");
    else limpiarError("email");

    var password = document.getElementById("password").value;
    var repetir = document.getElementById("repetirPassword").value;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/;
    if (!passwordRegex.test(password)) mostrarError("password", "Debe tener 6-12 caracteres, mayúscula, minúscula y número.");
    else limpiarError("password");

    if (password !== repetir) mostrarError("repetirPassword", "Las contraseñas no coinciden.");
    else limpiarError("repetirPassword");

    return valido;
}

function validarRUT(rut) {
    rut = rut.replace(/[.-]/g, "").toUpperCase();
    var cuerpo = rut.slice(0, -1);
    var dv = rut.slice(-1);
    var suma = 0;
    var multiplo = 2;
    for (var i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = (multiplo < 7) ? multiplo + 1 : 2;
    }
    var dvEsperado = 11 - (suma % 11);
    var dvCalc = (dvEsperado === 11) ? "0" : (dvEsperado === 10) ? "K" : dvEsperado.toString();
    return dv === dvCalc;
}
