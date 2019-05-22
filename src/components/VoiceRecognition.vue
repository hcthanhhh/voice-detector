//Colorchange.vue

<template>
  <div id="VoiceRecognition">
    <div>
      <textarea id="textarea" rows=10 cols=80 style="font-size: 2em"></textarea>
    </div>
    <button id="button" v-on:click="toggleStartStop()" style="font-size: 2em">Click to speak</button>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'voice',
  data () {
    return {
      button: document.getElementById('#button'),
      textarea: document.querySelector('textarea'),
      // colors: ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue',
      //   'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia',
      //   'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo',
      //   'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta',
      //   'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid',
      //   'peru', 'pink', 'plum', 'purple', 'red', 'salmon',
      //   'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle',
      //   'tomato', 'turquoise', 'violet', 'white', 'yellow'],
      recognizing: null,
      recognition: new webkitSpeechRecognition(),
      bg: document.querySelector('html'),
      result: '',
      interimResult: ''
    }
  },
  mounted () {
    this.init();
    window.addEventListener('keyup', (e) => {
      if(e.keyCode === 13) {
        this.toggleStartStop()
      }
    })
  },
  methods: {
    reset: function () {
      this.recognizing = false
    },
    init: function () {
      this.recognition.continuous = true
      this.recognition.interimResults = true
      this.recognition.lang = 'vi-VN'
      this.reset()
      this.recognition.onerror = function(event) {
        console.error(event);
      };
      this.recognition.onend = this.reset()
      this.recognition.onresult = (event) => {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.result += event.results[i][0].transcript
            textarea.value = this.result
            console.log("return result: ", this.result)
          }
          else {
            this.interimResult = event.results[i][0].transcript
            console.log("return interim result: ", this.interimResult)
          }
        }
      }
    },
    toggleStartStop: function () {
      if (this.recognizing) {
        this.recognition.stop()
        this.interimResult = ''
        this.reset()
      } else {
        this.recognition.start()
        this.recognizing = true
      }
    }
  }
}
</script>
