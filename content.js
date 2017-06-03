console.log("Wiki o' My Thumb (WOMT) extension loaded");

var currentUrl = $(location).attr('href');

var sessions = [
  {
    id: 1,
    startUrl: "https://fr.m.wikipedia.org/wiki/Cacaoyer",
    endUrl: "https://fr.m.wikipedia.org/wiki/Unterseeboot"
  },
  {
    id: 2,
    startUrl: 'https://fr.wikipedia.org/wiki/Pentagramme',
    endUrl: 'https://fr.wikipedia.org/wiki/Shinkansen'
  },
  {
    id: 3,
    startUrl: 'https://fr.wikipedia.org/wiki/Effet_Doppler',
    endUrl: 'https://fr.wikipedia.org/wiki/Babylone'
  },
  {
    id: 4,
    startUrl: 'https://fr.wikipedia.org/wiki/Super_Bowl',
    endUrl: 'https://fr.wikipedia.org/wiki/Giacomo_Casanova'
  },
  {
    id: 5,
    startUrl: 'https://fr.wikipedia.org/wiki/V%C3%A9suve',
    endUrl: 'https://fr.wikipedia.org/wiki/Deep_Blue'
  },
  {
    id: 6,
    startUrl: 'https://fr.wikipedia.org/wiki/Dopamine',
    endUrl: 'https://fr.wikipedia.org/wiki/%C3%89conomie_circulaire'
  },
  {
    id: 7,
    startUrl: 'https://fr.m.wikipedia.org/wiki/Pandore',
    endUrl: 'https://fr.m.wikipedia.org/wiki/Post-it'
  },
  {
    id: 8,
    startUrl: 'https://en.wikipedia.org/wiki/Paresseux',
    endUrl: 'https://en.wikipedia.org/wiki/Brucelles'
  },
  {
    id: 9,
    startUrl: 'https://fr.wikipedia.org/wiki/Narcos',
    endUrl: 'https://fr.wikipedia.org/wiki/Tay_(intelligence_artificielle)'
  }
];

if ( sessionId = sessionShouldStart() ) {
  // opening ceremony of the game
  console.log("WOMT game started");
  localStorage.setItem("womt_current_game", JSON.stringify({ "session_id": sessionId, "links": [] }));
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

    if (currentUrl == findSessionById(currentSessionId).endUrl) {
      return true;
    } else {
      return false;
    }
  }
}

function sessionShouldStart() {
  for (var i = 0; i < sessions.length; i++) {
    if (currentUrl == sessions[i].startUrl) {
      return sessions[i].id
    }
  };
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
    currentGame.links.push(link);

    // store this bucket back
    localStorage.setItem("womt_current_game", JSON.stringify(currentGame));
  });
}
