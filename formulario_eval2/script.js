
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();
    if (validarFormulario()) {
        alert("Formulario enviado correctamente.");
    }
});

function limpiarFormulario() {
    const form = document.getElementById("formulario");
    form.reset();
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll("input").forEach(e => e.classList.remove("error-input"));
}

function validarFormulario() {
    let valido = true;

    function mostrarError(id, mensaje) {
        document.getElementById("error-" + id).textContent = mensaje;
        document.getElementById(id).classList.add("error-input");
        valido = false;
    }

    function limpiarError(id) {
        document.getElementById("error-" + id).textContent = "";
        document.getElementById(id).classList.remove("error-input");
    }

    const nombre = document.getElementById("nombre").value.trim();
    if (!nombre) mostrarError("nombre", "El nombre es obligatorio.");
    else limpiarError("nombre");

    const rut = document.getElementById("rut").value.trim();
    if (!rut || !validarRUT(rut)) mostrarError("rut", "RUT inválido.");
    else limpiarError("rut");

    const fecha = document.getElementById("fechaNacimiento").value.trim();
    if (fecha && !/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) mostrarError("fechaNacimiento", "Formato de fecha inválido.");
    else limpiarError("fechaNacimiento");

    const cv = document.getElementById("cv").value;
    if (cv && !(/\.(pdf|docx)$/i.test(cv))) mostrarError("cv", "Solo se permiten archivos .pdf o .docx.");
    else limpiarError("cv");

    const email = document.getElementById("email").value.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) mostrarError("email", "Email inválido.");
    else limpiarError("email");

    const password = document.getElementById("password").value;
    const repetir = document.getElementById("repetirPassword").value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/;

    if (!passwordRegex.test(password)) mostrarError("password", "La contraseña debe tener entre 6 y 12 caracteres, con mayúscula, minúscula y número.");
    else limpiarError("password");

    if (password !== repetir) mostrarError("repetirPassword", "Las contraseñas no coinciden.");
    else limpiarError("repetirPassword");

    return valido;
}

function validarRUT(rut) {
    rut = rut.replace(/[.-]/g, "").toUpperCase();
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += +cuerpo[i] * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvCalc = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();
    return dv === dvCalc;
}
