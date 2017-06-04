chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "womt_game_ended" ) {
      generateResultsFor(request.current_game);
    }
  }
);

function generateResultsFor(game) {
  console.log('womt_game_ended');

  var factor = game.links.length;
  var dotAttributes = '';

  if (factor < 5) {
    dotAttributes += 'size="8.3,11.7!"; graph[layout=fdp] node[fontsize="32"] overlap="true"; ratio=fill; margin=0; node[shape=box] node[fontname="HersheySans"] K="1";';
  }
  if (factor >= 5 && factor < 11) {
    dotAttributes += 'size="8.3,11.7!"; graph[layout=fdp] node[fontsize="26"] overlap="true"; ratio=fill; margin=0; node[shape=box] node[fontname="HersheySans"] K="0.8";';
  }
  if (factor >= 11 && factor < 17) {
    dotAttributes += 'size="8.3,11.7!"; graph[layout=fdp] node[fontsize="18"] overlap="scalexy"; ratio=fill; margin=0; node[shape=box] node[fontname="HersheySans"]';
  }
  if (factor >= 17) {
    dotAttributes += 'size="8.3,11.7!"; graph[layout=fdp] node[fontsize="14"] overlap="scalexy"; ratio=fill; margin=0; node[shape=box] node[fontname="HersheySans"]';
  }

  var dot = 'digraph D { ';

  dot += dotAttributes;

  dot += escapeWordForDot(game.startPage);
  dot += ' -> ';

  for (var i = 0; i < game.links.length; i++) {
    dot += escapeWordForDot(game.links[i].text);
    dot += ' -> ';
  }

  dot += escapeWordForDot(game.endPage);
  dot += ' ; }';

  console.log(dot);

  var file = new File([dot], {type: "text/plain;charset=utf-8"});
  saveAs(file, "vis.dot");
}

function escapeWordForDot(word) {
  return '"' + word + '"';
}
