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
  
  for (var i = 0; i < game.links.length; i++) {
    dot += '"' + game.links[i].text + '"';
    
    if (i != game.links.length-1) {
      dot += ' -> ';
    }
  }
  
  dot += ' ; }';
  
  console.log(dot);
  
  var file = new File([dot], {type: "text/plain;charset=utf-8"});
  saveAs(file, "vis.dot");
}
