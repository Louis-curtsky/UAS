function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
  
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      displayContents(contents);
      displayParsed(contents);
    };
    reader.readAsText(file);
  }
  
  function displayContents(contents) {
    var element = document.getElementById('file-content');
    element.textContent = contents;
  }
  
  function displayParsed(contents) {
    const element = document.getElementById('file-parsed');
    const json = contents.split(',');
    element.textContent = JSON.stringify(json);
  }
  
  document.getElementById('file-input').addEventListener('change', readSingleFile, false);