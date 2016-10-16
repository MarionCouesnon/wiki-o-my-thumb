console.log("Extension Wiki o' My Thumb loaded");

$("a").click(function() {
  var clickedLink = $(this).attr("href");
  chrome.runtime.sendMessage({"message": "open_new_tab", "url": clickedLink});
});
