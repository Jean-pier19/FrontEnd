$(document).ready(function(){

    $("#todoForm").on("submit", function(e){
      e.preventDefault();
      if (validarFormularioTodo()) {
        alert("Todo guardado correctamente");
        limpiarFormularioTodo();
      }
    });
  
    $("#cancelTodo").click(function(){
      limpiarFormularioTodo();
    });
  
    function limpiarFormularioTodo(){
      $("#todoForm")[0].reset();
      $(".error").text("");
      $("input, select").removeClass("error-input");
    }
  
    function validarFormularioTodo(){
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
  
      var userId = $("#userId").val().trim();
      if(!userId) mostrarError("userId", "User ID es obligatorio.");
      else limpiarError("userId");
  
      var title = $("#title").val().trim();
      if(!title) mostrarError("title", "El título es obligatorio.");
      else limpiarError("title");
  
      return valido;
    }
  
  });
  