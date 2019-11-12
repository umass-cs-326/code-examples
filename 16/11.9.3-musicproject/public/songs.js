function showSongs() {
  const $list = $("ul");

  // Remove previous songs.
  $list.empty();

  // Retrieve current list of songs.
  $.get("/api/songs", (songs) => {
     songs.forEach(function(song) {
        $list.append("<li>" + song.title + " - " + 
           song.artist + " (popularity " + song.popularity + ")" + "</li>");
     });
  });
}

function newSongForm() {
  $("#saveBtn").click(() => {   
    let genre = [];
    if ($("#genre").val()) {
        // Create an array from the comma-separated values
        genre = $("#genre").val().split(",");
    }
  
    // Create a song object from the form fields
    let song = {
        title: $("#title").val(),
        artist: $("#artist").val(),
        releaseDate: $("#released").val(),
        popularity: $("#popularity").val(),
        genre: genre
    };
  
    // POST a request with the JSON-encoded song to the Music API
    $.ajax({
        type: "POST",
        url: "/api/songs",
        data: JSON.stringify(song),
        contentType: "application/json"
    }).done((data) => {
        // Reset the form after saving the song
        $("form").trigger("reset");
        showSongs();
        loadDeleteSongs();
    }).fail((jqXHR) => {
        $("#error").html("The song could not be added.");
    });
  });
}

function loadDeleteSongs() {
  $.get("/api/songs", function(songs) {
      let $select = $("select");
      $select.html("");
      songs.forEach(function(song) {
          $select.append("<option value='" + song._id + "'>" + 
              song.title + "</option>")
      });
  });
}

function deleteSongForm() {
  $("#deleteBtn").click(function() {
    // Get the song ID of the selected song
    var songId = $("select :selected").val();

    $.ajax({
        type: "DELETE",
        url: "/api/songs/" + songId
    }).done(function(data) {
        // Successfully deleted song
        showSongs();
        loadDeleteSongs();        
    }).fail(function(jqXHR) {
        $("#error").html("The song could not be deleted.");
    });
});
}

$(() => {
  showSongs();
  newSongForm();
  loadDeleteSongs();
  deleteSongForm();
});
