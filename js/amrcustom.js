(function() {
  function E(selector) {
    return document.querySelector(selector);
  }
  var amr;
  var loadDemoBtn = E('#amr-load');
  var loadAmrFile = E('#amr-file');
  var playBtn = E('#amr-play');
  var duration = E('#amr-duration');

  loadDemoBtn.onclick = function() {
    amr = new BenzAMRRecorder();
    loadDemoBtn.setAttribute('disabled', true);
    loadAmrFile.setAttribute('disabled', true);
    playBtn.setAttribute('disabled', true);
    amr.initWithUrl('./res/mario.amr').then(function() {
      loadDemoBtn.removeAttribute('disabled');
      loadAmrFile.removeAttribute('disabled');
      playBtn.removeAttribute('disabled');
      duration.innerHTML = amr.getDuration().toFixed(2) + '\'';
    });
  };

  playBtn.onclick = function() {
    if (amr.isPlaying()) {
      amr.stop();
      playBtn.innerHTML = 'Play';
    } else {
      amr.play();
      playBtn.innerHTML = 'Stop';
      amr.onEnded(function() {
        playBtn.innerHTML = 'Play';
      });
    }
  };

  loadAmrFile.onchange = function() {
    amr = new BenzAMRRecorder();
    loadDemoBtn.setAttribute('disabled', true);
    loadAmrFile.setAttribute('disabled', true);
    playBtn.setAttribute('disabled', true);
    amr.initWithBlob(this.files[0]).then(function() {
      loadDemoBtn.removeAttribute('disabled');
      loadAmrFile.removeAttribute('disabled');
      playBtn.removeAttribute('disabled');
      duration.innerHTML = amr.getDuration().toFixed(2) + '\'';
    });
  };
  var amrForRecorder;

  var recordBtn = E('#amr-record');
  var playRecordBtn = E('#amr-play-record');
  var downRecordLink = E('#amr-down-record');
  var recordDuration = E('#amr-record-duration');

  recordBtn.onclick = function() {
    if (amrForRecorder && amrForRecorder.isRecording()) {
      recordBtn.innerHTML = 'Grabar';
      playRecordBtn.removeAttribute('disabled');
      amrForRecorder.finishRecord().then(() => {
        downRecordLink.href = window.URL.createObjectURL(amrForRecorder.getBlob());
        console.log(amrForRecorder.getBlob());
        downRecordLink.innerHTML = 'Descargar';
        recordDuration.innerHTML = amrForRecorder.getDuration().toFixed(2) + '\'';
      });
    } else {
      recordBtn.innerHTML = 'Detener';
      playRecordBtn.setAttribute('disabled', true);
      amrForRecorder = new BenzAMRRecorder();
      amrForRecorder.initWithRecord().then(() => {
        amrForRecorder.startRecord();
      }).catch(function(e) {
        alert(JSON.stringify(e));
      });
    }
  };

  playRecordBtn.onclick = function() {
    if (amrForRecorder.isPlaying()) {
      amrForRecorder.stop();
      playRecordBtn.innerHTML = 'Reproducir';
    } else {
      amrForRecorder.play();
      playRecordBtn.innerHTML = 'Detener';
      amrForRecorder.onEnded(function() {
        playRecordBtn.innerHTML = 'Reproducir Grabacion';
      });
    }
  };
})();
