chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "womt_game_ended" ) {
      generateResultsFor(request.current_game);
    }
  }
);

function generateResultsFor(game) {
  var pdf = new jsPDF();

  for (var i = 0; i < game.length; i++) {
    pdf.text(20, 20 + (i * 10), game[i].text + " " + "(" + game[i].href + ")");
  }

  pdf.save("womt.pdf");
}
