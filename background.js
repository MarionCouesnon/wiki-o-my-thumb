chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {    
    if( request.message === "womt_game_ended" ) {
      generateResultsFor(request.current_game);
    }
  }
);

function generateResultsFor(game) {
  var dot = 'digraph D { ';
  
  for (var i = 0; i < request.current_game.links.length; i++) {
    dot += '"' + request.current_game.links[i].text + '"';
    
    if (i != request.current_game.links.length-1) {
      dot += ' -> ';
    }
  }
  
  dot += ' ; }';
  
  var file = new File([dot], {type: "text/plain;charset=utf-8"});
  saveAs(file, "vis.dot");
}
