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
  
  if (factor < 3) {
    dotAttributes += 'edge[color=blue]';
  }
  if (factor >= 3 && < 6) {
    dotAttributes += 'edge[color=red]';
  }
  if (factor >= 6 && < 9) {
    dotAttributes += 'edge[color=yellow]';
  }
  if (factor >= 9) {
    dotAttributes += 'edge[color=green]';
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
