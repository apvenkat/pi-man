$(function() {
  $(".signup").submit(function(e) {
    e.preventDefault();
    $.post(
      "/api/AddUser",
      {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val()
      },
      alert
    );
  }); //feedback messages

  function alert() {
    var output = "";
    output +=
      '<div class="alert alert-success" role="alert"> Data Inserted Successfully !!</div>';
    $(".alert-messages").html(output);
  }
});
