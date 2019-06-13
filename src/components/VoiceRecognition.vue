//VoiceRecognition.vue

<template>
  <div id="VoiceRecognition" class="overlay">
    <button id="Speech" v-on:click="toggleStartStop()">
      <img
        id="microbutton"
        src="https://img.icons8.com/material/24/000000/microphone.png"
        alt
        srcset
      >
    </button>
    <div id="search" class="modal">
      <div class="modal-content">
        <span class="close" v-on:click="toggleStartStop()">
          <button>
            <img src="https://img.icons8.com/material/24/000000/block_microphone.png" alt srcset>
          </button>
        </span>
        <textarea id="textarea" type="text" v-model="result"></textarea>
      </div>
    </div>
    <a id="downloadLink"></a>
  </div>
</template>

<script type="text/javascript">
// import wavpackage from '../services/convertWAV/wavpackage'
// import axios from 'axios'
// import Vue from 'vue'
export default {
  /*eslint-disable*/
  name: "VoiceRecognition",
  data() {
    return {
      // get Elements
      button: null,
      textarea: null,
      downloadLink: null,
      microbutton: null,
      modal: null,
      span: null,

      // speech Recognition
      recognizing: null,
      // eslint-disable-next-line
      recognition: new window.webkitSpeechRecognition(),
      result: "say something!",
      interimResult: "",

      // record media
      constraints: { audio: true },
      localstream: null,
      mediaRecorder: null,
      chunks: [],
      count: 0,
      isRecord: false,
      audioContext: null,

      // check if Speech API is supported
      check: true
    };
  },
  mounted() {
    // Speech Recognition
    this.getElement();
    // this.init()
    // if (!this.check) this.CheckAPIrecord()
    this.CheckAPIrecord();
    window.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        console.log("enter");
        this.switcher();
      }
    });
    window.onclick = function(event) {
      if (event.target === this.modal) {
        this.modal.style.display = "none";
      }
    };
  },
  methods: {
    getElement: function() {
      this.button = document.querySelector("button#Speech");
      this.textarea = document.querySelector("textarea");
      this.downloadLink = document.querySelector("a#downloadLink");
      this.microbutton = document.getElementById("microbutton");
      this.span = document.getElementsByClassName("close")[0];
      this.modal = document.getElementById("search");
    },
    switcher: function() {
      // if (this.check) this.toggleStartStop()
      // else {
      if (this.isRecord) {
        this.isRecord = false;
        // this.button.textContent = 'Click to Speak'
        this.onBtnStopClicked();
      } else {
        this.isRecord = true;
        // this.button.textContent = 'Click to Stop'
        this.onBtnRecordClicked();
        // }
      }
    },
    reset: function() {
      this.recognizing = false;
    },
    init: function() {
      console.log(this.recognition);
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      console.log("language:", this.recognition.lang);
      // this.recognition.lang = 'vi-VN'
      // this.reset()
      this.recognition.onerror = event => {
        console.log(event);
        if (event.error === "no-speech") this.toggleStartStop();
        if (event.error === "language-not-supported") {
          this.check = false;
          this.recognition.lang = "";
        }
        if (event.error === "not-allowed") {
          this.toggleStartStop();
          alert("cannot use your microphone!");
        }
      };
      // this.check = false
      // this.recognition.lang = 'en-US'
      // this.recognition.onend = this.reset()
      this.recognition.onend = () => {
        this.recognizing = false;
        this.result = "say something!";
      };
      this.recognition.onresult = event => {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.result = event.results[i][0].transcript;
            // this.textarea.value = this.result
            console.log("return result: ", this.result);
            // this.$emit('clicked', this.result)
          } else {
            // this.interimResult = event.results[i][0].transcript
            this.result = event.results[i][0].transcript;
            console.log("return interim result: ", this.result);
          }
        }
      };
    },
    toggleStartStop: function(event) {
      if (this.recognizing) {
        // this.recognition.stop()
        // if (!this.check) this.onBtnStopClicked()
        // this.button.textContent = 'Click to Speak'
        // console.log('stop recognizing')
        // this.interimResult = ''
        // this.recognizing = false
        this.modal.style.display = "none";
        // this.$emit('clicked', this.result)
        // console.log('check: ', this.recognizing)
        this.onBtnStopClicked();
      } else {
        // this.recognition.start()
        // if (!this.check) this.onBtnRecordClicked()
        this.modal.style.display = "block";
        // this.textarea.focus()
        // this.button.textContent = 'Click to Stop'
        // console.log('start recognizing')
        // this.recognizing = true
        // console.log('check: ', this.recognizing)
        this.onBtnRecordClicked();
      }
    },
    CheckAPIrecord: function() {
      if (!navigator.mediaDevices.getUserMedia) {
        console.log("navigator.mediaDevices.getUserMedia is not supported");
      } else if (window.MediaRecorder === undefined) {
        console.log("Media Recorder is not supported");
      } else {
        navigator.mediaDevices
          .getUserMedia(this.constraints)
          .then(stream => {
            this.localstream = stream;
            this.localstream.getAudioTracks().forEach(track => {
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
              var AudioContext =
                window.AudioContext || window.webkitAudioContext;
              this.audioContext = new AudioContext();
              console.log("Web Audio API is supported");

              console.log(this.audioContext);
            } catch (e) {
              console.log("Web Audio API is not supported");
            }
          })
          .catch(err => {
            console.log("navigator.getUserMedia error: ", err);
          });
        console.log("Web Audio API is online");
      }
    },
    onBtnRecordClicked: function() {
      console.log("Recording...");
      if (this.localstream == null) {
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
          this.mediaRecorder = new MediaRecorder(this.localstream, option);
        } else {
          console.log("isTypeSupported is not supported");
          this.mediaRecorder = new MediaRecorder(this.localstream);
        }
        this.mediaRecorder.ondataavailable = e => {
          this.chunks.push(e.data);
        };
        this.mediaRecorder.onerror = e => {
          console.log("mediaRecorder.onerror: ", e);
        };
        this.mediaRecorder.onstart = () => {
          console.log(
            "mediaRecorder.onstart, mediaRecorder.state = ",
            this.mediaRecorder.state
          );
          this.localstream.getTracks().forEach(track => {
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
        this.mediaRecorder.onstop = () => {
          console.log(
            "mediaRecorder.onstop, mediaRecorder.state = ",
            this.mediaRecorder.state
          );

          var blob = new Blob(this.chunks, { type: "audio/webm" });
          this.chunks = [];

          var audioURL = window.URL.createObjectURL(blob);

          this.downloadLink.href = audioURL;
          this.downloadLink.innerHTML = "Download audio file";

          var rand = Math.floor(Math.random() * 10000000);
          var name = "audio_" + rand + ".wav";

          this.downloadLink.setAttribute("download", name);
          this.downloadLink.setAttribute("name", name);
        };

        this.mediaRecorder.onwarning = e => {
          console.log("mediaRecorder.onwarning: ", e);
        };

        this.mediaRecorder.start(10);
      }
    },
    onBtnStopClicked: function() {
      this.mediaRecorder.stop();
    }
  }
  // },
  // directives: {
  //   VoiceRecognition: {
  //     update: function (el, b, n, o) {

  //     },
  //     bind: function (el, binding, vnode) {
  //       console.log('binding')
  //       var s = JSON.stringify
  //       el.innerHTML = 'value' + s(binding.value)
  //     }
  //   }
  // }
};
// Vue.directives('voice-search', VoiceRecognition)
</script>

<style scoped>
#VoiceRecognition {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
}
/* The Modal background */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

/* Modal content box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close {
  color: #aaa;
  float: right;
}
.close:hover .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
#textarea {
  border-style: hidden;
}
</style>
