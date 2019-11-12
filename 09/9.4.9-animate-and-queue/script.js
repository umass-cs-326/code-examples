$(() => {

  let $helpText = $("#help-text");

  $("#help").click(function () {
    // Notice that we reference $helpText inside of this anonymous
    // function - a common example of how closure is useful.
    if ($helpText.is(":visible")) {
      $(this).queue(function (next) {
          $helpText.fadeOut("fast");
          next();
        })
        .animate({
          left: "10px",
          width: "-=15",
          fontSize: "-=10"
        }, "slow")
        .queue(function (next) {
          $(this).css("background", "lightblue");
          next();
        })
    } else {
      $(this).animate({
          left: "240px",
          width: "+=15",
          fontSize: "+=10"
        }, "slow")
        .queue(function (next) {
          $(this).css("background", "orange");
          next();
        })
        .queue(function (next) {
          $helpText.fadeIn("fast");
          next();
        })
    }
  });

});