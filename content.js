console.log("Wiki o' My Thumb (WOMT) extension loaded");

var currentUrl = $(location).attr('href');

var sessions = [
  {
    id: 1,
    startPage: "Cacaoyer",
    endPage: "Unterseeboot"
  },
  {
    id: 2,
    startUrl: "Pentagramme",
    endUrl: "Shinkansen"
  },
  {
    id: 3,
    startUrl: "Effet Doppler",
    endUrl: "Babylone"
  },
  {
    id: 4,
    startUrl: "Super Bowl",
    endUrl: "Giacomo Casanova"
  },
  {
    id: 5,
    startUrl: "Vésuve",
    endUrl: "Deep Blue"
  },
  {
    id: 6,
    startUrl: "Dopamine",
    endUrl: "Économie circulaire"
  },
  {
    id: 7,
    startUrl: "Pandore",
    endUrl: "Post-it"
  },
  {
    id: 8,
    startUrl: "Paresseux",
    endUrl: "Brucelles"
  },
  {
    id: 9,
    startUrl: "Narcos",
    endUrl: "Tay (intelligence artificielle)"
  }
];

if ( sessionId = sessionShouldStart() ) {
  // opening ceremony of the game
  console.log("WOMT game started");

  localStorage.setItem("womt_current_game", JSON.stringify({
    "session_id": sessionId,
    "startPage" : findSessionById(sessionId).startPage,
    "endPage" : findSessionById(sessionId).endPage,
    "links": []
  }));
}

else if ( sessionShouldEnd() ) {
  // closing ceremony
  console.log("WOMT game ended");
  chrome.runtime.sendMessage({ "message": "womt_game_ended", "current_game": currentGame() });

  // remove all the data stored locally
  // to keep only one "womt_current_game" variable stored.
  // This helps to detect if a game is in progress or not in content.js script.
  localStorage.removeItem("womt_current_game")
}

if (game = currentGame()) {
  storeClickedLinkFor(game);
}

function findSessionById(id) {
  for (var i = 0; i < sessions.length; i++) {
    if (sessions[i].id == id) {
      return sessions[i];
    }
  }
}

function sessionShouldEnd() {
  if (game = currentGame()) {
    currentSessionId = game.session_id;

    var wikiPageTitle = $('#firstHeading').text();

    return (wikiPageTitle == findSessionById(currentSessionId).endPage);
  }
}

function sessionShouldStart() {
  for (var i = 0; i < sessions.length; i++) {

/*
    var s = currentUrl;
    var regex = /https?:\/\/[a-zA-Z0-9\.]+\.wikipedia\.[a-zA-Z]{2,4}/;

    if (s.match(regex)) {
*/

    var wikiPageTitle = $('#firstHeading').text();

    if (wikiPageTitle == sessions[i].startPage) {
      return sessions[i].id
    }
//    }
  }
}

function currentGame() {
  return JSON.parse(localStorage.getItem("womt_current_game"));
}

function storeClickedLinkFor(currentGame) {
  // track clicked links using jQuery
  $("a").click(function() {

    // create an object with the title
    var link = {
      text: $(this).text()
    }

    // add this object to the links bucket
    currentGame.links.push(link);

    // store this bucket back
    localStorage.setItem("womt_current_game", JSON.stringify(currentGame));
  });
}
