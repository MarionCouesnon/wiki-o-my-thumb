console.log("Extension Wiki o' My Thumb loaded");

$("a").click(function() {
  var clickedLink = $(this).attr("href");
  console.log(clickedLink);
});
