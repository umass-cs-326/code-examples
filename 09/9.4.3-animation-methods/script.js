$(() => {
  console.log('initializing');

  var $img = $("img");

  $("#show-btn").click(function () {
    console.log('clicked show button');
    $img.show("normal");
  });

  $("#hide-btn").click(function () {
    console.log('clicked hide button');
    $img.hide("normal");
  });

  $("#toggle-btn").click(function () {
    console.log('clicked toggle button');
    $img.toggle("normal");
  });

  $("#fadein-btn").click(function () {
    console.log('clicked fadein button');
    $img.fadeIn("normal");
  });

  $("#fadeout-btn").click(function () {
    console.log('clicked fadeout button');
    $img.fadeOut("normal");
  });

  $("#fadetoggle-btn").click(function () {
    console.log('clicked fadetoggle button');
    $img.fadeToggle("normal");
  });

  $("#slidedown-btn").click(function () {
    console.log('clicked slidedown button');
    $img.slideDown("normal");
  });

  $("#slideup-btn").click(function () {
    console.log('clicked slideup button');
    $img.slideUp("normal");
  });

  $("#slidetoggle-btn").click(function () {
    console.log('clicked slidetoggle button');
    $img.slideToggle("normal");
  });
});