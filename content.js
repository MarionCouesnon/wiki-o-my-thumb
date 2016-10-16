console.log("Wiki o' My Thumb (WOMT) extension loaded");

var currentURL = $(location).attr('href');
var startingPoint = 'https://fr.m.wikipedia.org/wiki/Cacaoyer';

if (currentURL == startingPoint) {
  // opening ceremony of the game
  console.log("WOMT game started");
  localStorage.setItem("womt_current_game", "[]")
}

if (game = currentGame()) {
  storeClickedLinkFor(game);
}

function currentGame() {
  return JSON.parse(localStorage.getItem("womt_current_game"));
}

function storeClickedLinkFor(currentGame) {
  // track clicked links using jQuery
  $("a").click(function() {

    // create an object with the link href and title
    var link = {
      href: $(this).attr("href"),
      text: $(this).text()
    }

    // add this object to the links bucket
    currentGame.push(link);

    // store this bucket back
    localStorage.setItem("womt_current_game", JSON.stringify(currentGame));
  });
}
