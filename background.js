chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "womt_game_ended" ) {
      generateResultsFor(request.current_game);
    }
  }
);

function generateResultsFor(game) {
  var pdf = new jsPDF();

  pdf.text(20, 20, "Session #" + game.session_id);

  for (var i = 0; i < game.links.length; i++) {
    pdf.text(20, 30 + (i * 10), game.links[i].text + " " + "(" + game.links[i].href + ")");
  }

  pdf.save("womt.pdf");
}
