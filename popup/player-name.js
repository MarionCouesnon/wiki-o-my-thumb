document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("message")) {
    return;
  }

  var chosenPage = "https://" + e.target.textContent;
  browser.tabs.create({
    url: chosenPage
  });

});
