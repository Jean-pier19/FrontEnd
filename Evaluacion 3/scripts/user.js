$(document).ready(function(){

  $("#userForm").on("submit", function(e){
    e.preventDefault();
    if (validarFormulario()) {
      alert("Usuario guardado correctamente");
      limpiarFormulario();
    }
  });

  $("#cancelUser").click(function(){
    limpiarFormulario();
  });

  function limpiarFormulario(){
    $("#userForm")[0].reset();
    $(".error").text("");
    $("input").removeClass("error-input");
  }

  function validarFormulario(){
    var valido = true;

    function mostrarError(id, mensaje){
      $("#error-" + id).text(mensaje);
      $("#" + id).addClass("error-input");
      valido = false;
    }

    function limpiarError(id){
      $("#error-" + id).text("");
      $("#" + id).removeClass("error-input");
    }

    var nombre = $("#name").val().trim();
    if(!nombre) mostrarError("name", "El nombre es obligatorio.");
    else limpiarError("name");

    var username = $("#username").val().trim();
    if(!username) mostrarError("username", "El usuario es obligatorio.");
    else limpiarError("username");

    var fecha = $("#fecha").val().trim();
    var fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if(!fecha) mostrarError("fecha", "La fecha es obligatoria.");
    
    else limpiarError("fecha");

    var email = $("#email").val().trim();
    var emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if(!email) mostrarError("email", "El email es obligatorio.");
    else if(!emailRegex.test(email)) mostrarError("email", "Formato de email inválido.");
    else limpiarError("email");

    return valido;
  }

});
