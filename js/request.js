var handleFileSelect = function(evt) {
  var files = evt.target.files;
  var file = files[0];
  if (files && file) {
    var reader = new FileReader();
    reader.onload = function(readerEvt) {
      var binaryString = readerEvt.target.result;
      document.getElementById("encodedResult").value = btoa(binaryString);
    };
    reader.readAsBinaryString(file);
    $("button#procesar").prop("disabled", false);

  }
};

if (window.File && window.FileReader && window.FileList && window.Blob) {
  document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
} else {
  alert('Tu navegador no soporta este evento.');
}


$("button#procesar").click(function() {
  var langcode = $("#langcodeselect").val();
  var base64data = $("textarea#encodedResult").val();
  console.log(langcode);
  var data = JSON.stringify({
    "config": {
      "encoding": "AMR",
      "sampleRateHertz": 8000,
      "languageCode": langcode,
      "maxAlternatives": 1,
      "profanityFilter": true,
      "enableWordTimeOffsets": false
    },
    "audio": {
      "content": base64data
    }
  });
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyDjFb-kHwyIdaQrjIRV_v_pJYpGWpBhKps",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"

    },
    "processData": false,
    "data": data
  }

  $.ajax(settings).done(function(response) {
    console.log(response);
    $("textarea#resultado").val(response.results["0"].alternatives["0"].transcript);
    $("input#precision").val(response.results["0"].alternatives["0"].confidence * 100);
  });

});



//Boton Watson
$("button#intencion").click(function() {
  var data = new FormData();
  data.append("textoa", $("textarea#resultado").val());


  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      var rwatson = JSON.parse(this.responseText);
      console.log(rwatson);
      console.log(rwatson.intents[0].intent);
      $("input#intent").val(rwatson.intents[0].intent);

      for(var i = 0; i < rwatson.length; ++i){
   //do something with obj[i]
   for(var ind in obj[i]) {
        console.log(ind);
        for(var vals in obj[i][ind]){
            console.log(vals, obj[i][ind][vals]);
        }
   }
}
    }
  });

  xhr.open("POST", "https://pruebas.aprimerpalo.com/speech/php/index.php");
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("Postman-Token", "24583018-557f-45ac-b166-728fd3f13f2a");

  xhr.send(data);


});

//Watson

$("button#restart").click(function() {
  location.reload();

});
