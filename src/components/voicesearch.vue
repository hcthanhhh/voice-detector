<script>
/*eslint-disable*/
import Vue from "vue";
const axios = require("axios");

var recognition = new window.webkitSpeechRecognition();
let recognizing = false;
let result = null;

export const VoiceSearch = {
  isFn: true, //important
  bind(el, bindings) {
    // let type = bindings.arg;
    let output = bindings.value;
    console.log("modifiers: ", bindings.modifiers);

    if (bindings.modifiers["click"])
      el.addEventListener("click", () => {
        console.log("click");
        initVoiceSearch(output, el);
        recognition.start();
      });
    if (bindings.modifiers["keyup"])
      window.addEventListener("keyup", e => {
        if (e.keyCode === 13) {
          console.log(e);
          initVoiceSearch(output, el);
          recognition.start();
        }
      });
    console.log("textarea: ", output);
  }
};

function initVoiceSearch(output, el) {
  //format recognition
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "vi-VN";
  console.log(recognition);
  console.log(recognition.lang);

  //----------Recognition function----------
  recognition.onerror = event => {
    console.log(event);
    if (event.error === "no-speech") recognizing = false;
    if (event.error === "language-not-supported") recognition.lang = "";
    if (event.error === "not-allowed") alert("cannot use your microphone!");
  };

  recognition.onend = () => {
    console.log("stop recognizing");
    document.getElementById(output).textContent = result;
  };

  recognition.onresult = event => {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        result = event.results[i][0].transcript;
        console.log("result: ", result);
      } else {
        console.log(event.results[i][0].transcript);
      }
    }
  };
}
function toggleStartStop() {
  if (recognizing) {
    console.log("stop recognizing");
    recognition.stop();
    axios({
      method: "get",
      url: `https://api.wit.ai/message`,
      headers: { Authorization: "Bearer C5DK2PSBAIIRDAALILREKUJG2CKMK7ZA" },
      params: {
        v: 20190726,
        q: result
      }
    })
      .then(response => {
        res = response.data;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    recognizing = false;
  } else {
    console.log("start recognizing");
    recognition.start();
    recognizing = true;
  }
}

Vue.directive("voice-search", VoiceSearch);
</script>
