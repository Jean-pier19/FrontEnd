$(document).ready(function() {

    $("#loadDataBtn").click(function() {
      var selected = $("#dataSelect").val();
      var url = "https://jsonplaceholder.typicode.com/" + selected;
  
      $.ajax({
        url: url,
        method: "GET",
        success: function(data) {
          loadTable(data, selected);
        },
        error: function() {
          alert("Error al cargar datos");
        }
      });
    });
  
    function loadTable(data, type) {
      if ($.fn.DataTable.isDataTable("#dataTable")) {
        $("#dataTable").DataTable().clear().destroy();
      }
      $("#dataTable thead tr").empty();
  
      var columns = [];
  
      if(type === "users") {
        columns = ["id", "name", "username", "email"];
      } else if(type === "posts") {
        columns = ["userId", "id", "title", "body"];
      } else if(type === "todos") {
        columns = ["userId", "id", "title", "completed"];
      }
  
      columns.forEach(function(col){
        $("#dataTable thead tr").append("<th>" + col + "</th>");
      });
  
      var rows = data.map(function(item){
        return columns.map(function(col){
          return item[col];
        });
      });
  
      $("#dataTable").DataTable({
        data: rows
      });
    }
  
  });
  