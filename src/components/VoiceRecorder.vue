//VoiceRecorder.Vue
<script>
/*eslint-disable*/
import Vue from "vue";

// record media
var constraints = { audio: true };
var localstream = null;
var mediaRecorder = null;
var chunks = [];
var isRecord = false;
var audioContext = null;
var check = false;

function CheckAPIrecord() {
  check = true;
  if (!navigator.mediaDevices.getUserMedia) {
    console.log("navigator.mediaDevices.getUserMedia is not supported");
  } else if (window.MediaRecorder === undefined) {
    console.log("Media Recorder is not supported");
  } else {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        localstream = stream;
        localstream.getAudioTracks().forEach(track => {
          if (track.kind === "audio") {
            console.log(
              "audio track.onended Audio track.readyState=",
              track.readyState,
              ", track.muted=",
              track.muted
            );
          }
        });
        try {
          var AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContext = new AudioContext();
          console.log("Web Audio API is supported");
          console.log(audioContext);
        } catch (e) {
          console.log("Web Audio API is not supported");
        }
      })
      .catch(err => {
        console.log("navigator.getUserMedia error: ", err);
      });
    console.log("Web Audio API is online");
  }
}
function onBtnRecordClicked(output) {
  console.log("Recording...");
  console.log(output)
  if (localstream == null) {
    console.log("Could not get local stream from mic");
  } else {
    console.log("Start Recording...");
    if (typeof MediaRecorder.isTypeSupported === "function") {
      var option;
      if (MediaRecorder.isTypeSupported("audio/wav")) {
        option = { mimeType: "audio/wav" };
      } else if (MediaRecorder.isTypeSupported("audio/webm")) {
        option = { mimeType: "audio/webm" };
      } else if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        option = { mimeType: "audo/webm;codes=opus" };
      }
      console.log("Using ", option.mimeType);
      mediaRecorder = new MediaRecorder(localstream, option);
    } else {
      console.log("isTypeSupported is not supported");
      mediaRecorder = new MediaRecorder(localstream);
    }
    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data);
    };
    mediaRecorder.onerror = e => {
      console.log("mediaRecorder.onerror: ", e);
    };
    mediaRecorder.onstart = () => {
      console.log(
        "mediaRecorder.onstart, mediaRecorder.state = ",
        mediaRecorder.state
      );
      localstream.getTracks().forEach(track => {
        if (track.kind === "audio") {
          console.log(
            "onstart - Audio track.readyState = ",
            track.readyState,
            ", track.muted=",
            track.muted
          );
        }
      });
    };
    mediaRecorder.onstop = () => {
      console.log(
        "mediaRecorder.onstop, mediaRecorder.state = ",
        mediaRecorder.state
      );
      console.log(output)
      let downloadLink = document.getElementById(output);
      var blob = new Blob(chunks, { type: "audio/webm" });
      chunks = [];

      var audioURL = window.URL.createObjectURL(blob);

      downloadLink.href = audioURL;
      downloadLink.innerHTML = "Download audio file";

      var rand = Math.floor(Math.random() * 10000000);
      var name = "audio_" + rand + ".wav";

      downloadLink.setAttribute("download", name);
      downloadLink.setAttribute("name", name);
    };

    mediaRecorder.onwarning = e => {
      console.log("mediaRecorder.onwarning: ", e);
    };

    mediaRecorder.start(10);
  }
}
function onBtnStopClicked() {
  mediaRecorder.stop();
}

async function toggleStartStop(output) {
  if (isRecord) {
    onBtnStopClicked();
    isRecord = false;
  } else {
    await onBtnRecordClicked(output);
    isRecord = true;
  }
}

export const voicerecorder = {
  bind(el, bindings) {
    let output = bindings.value;
    console.log(output)
    console.log(bindings.modifiers);
    if (!check) CheckAPIrecord();

    if (bindings.modifiers["click"]) {
      el.addEventListener("click", () => {
        console.log("click");
        toggleStartStop(output);
      });
    }

    if (bindings.modifiers["keyup"]) {
      window.addEventListener("keyup", e => {
        if (e.keyCode === 13) {
          console.log("enter");
          toggleStartStop(output);
        }
      });
    }
  }
};

Vue.directive("voice-recorder", voicerecorder);
</script>
