chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "generate_pdf" ) {
      generatePDF(request.url)
    }
  }
);


function generatePDF(url) {
  var pdf = new jsPDF();

  pdf.text(url);
  pdf.save("wiki-o-my-thumb.pdf");
}
