$(function() {   
   
  // Use in place of localStorage
  var token;
   
  function login(username, password) {
     // Clear any previous error messages
     $("#errorMsg").html("");
     
     var requestData = { username: username, password: password };
     
     $.ajax({
        type: "POST",
        url: "/api/auth",
        data: JSON.stringify(requestData),
        contentType: "application/json"
      }).done((data) => {
        if (data.token) {
          // Store token in local storage
          //window.localStorage.setItem("token", data.token);
          
          token = data.token;
          displayStatus();
        }
        else {
            $("#errorMsg").html("Token not found.");
        }
        // Reset the form after saving the song
        $("form").trigger("reset");        
      }).fail((jqXHR) => {
        $("#errorMsg").html("Could not login.");
      });
  }    
   
  $("#loginBtn").click(function() {
     login($("#username").val(), $("#password").val());        
  });
   
  function displayStatus() {
     // Get rid of all the statuses
     $("#status li").remove();

     // Get the token from localStorage
     //var token = window.localStorage.getItem("token");
       
     $.ajax({
        url: "/api/status",
        type: "GET",
        headers: {"X-Auth": token}
     }).done(function(data) {
        var $status = $("#status");
        data.forEach(function(item) {
            $status.append("<li>" + item.username + " - " + item.status + "</li>");
        });
     }).fail(function(jqXHR) {
        $("#errorMsg").html(jqXHR.responseJSON.error);
     });
  }
  
  $("#statusBtn").click(displayStatus);   
});
