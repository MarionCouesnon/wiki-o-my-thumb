chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {    
    if( request.message === "womt_game_ended" ) {
      generateResultsFor(request.current_game);
    }
  }
);

function generateResultsFor(game) {
  console.log('womt_game_ended');
  
  var dot = 'digraph D { ';
  
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
