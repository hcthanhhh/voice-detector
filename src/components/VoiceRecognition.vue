//VoiceRecognition.vue

<template>
  <div id="VoiceRecognition">
    <div id="search">
      <input type="text" v-model = "result">
      <button id="Speech" v-on:click="toggleStartStop()"><img id="microbutton" src="https://img.icons8.com/material/24/000000/microphone.png" alt="" srcset=""></button>
    </div>
    <a id="downloadLink"></a>
  </div>
</template>

<script type="text/javascript">
// import wavpackage from '../services/convertWAV/wavpackage'
// import axios from 'axios'
export default {
  name: 'VoiceRecognition',
  data () {
    return {
      // get Elements
      button: null,
      input: null,
      downloadLink: null,
      microbutton: null,

      // speech Recognition
      recognizing: null,
      // eslint-disable-next-line
      recognition: new window.webkitSpeechRecognition(),
      result: '',
      interimResult: '',

      // record media
      constraints: {audio: true},
      localstream: null,
      mediaRecorder: null,
      chunks: [],
      count: 0,
      isRecord: false,
      audioContext: null,

      // check if Speech API is supported
      check: true
    }
  },
  mounted () {
    // Speech Recognition
    this.getElement()
    this.init()
    if (!this.check) this.CheckAPIrecord()
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.switcher()
      }
    })
  },
  methods: {
    getElement: function () {
      this.button = document.querySelector('button#Speech')
      this.input = document.querySelector('input')
      this.downloadLink = document.querySelector('a#downloadLink')
      this.microbutton = document.getElementById('microbutton')
    },
    switcher: function () {
      if (this.check) this.toggleStartStop()
      else {
        if (this.isRecord) {
          this.isRecord = false
          // this.button.textContent = 'Click to Speak'
          this.onBtnStopClicked()
        } else {
          this.isRecord = true
          // this.button.textContent = 'Click to Stop'
          this.onBtnRecordClicked()
        }
      }
    },
    reset: function () {
      this.recognizing = false
    },
    init: function () {
      console.log(this.recognition)
      this.recognition.continuous = true
      this.recognition.interimResults = true
      console.log('language:', this.recognition.lang)
      // this.recognition.lang = 'vi-VN'
      // this.reset()
      this.recognition.onerror = (event) => {
        console.log(event)
        if (event.error === 'no-speech') this.toggleStartStop()
        if (event.error === 'language-not-supported') {
          this.check = false
          this.recognition.lang = ''
        }
        if (event.error === 'not-allowed') {
          this.toggleStartStop()
          alert('cannot use your microphone!')
        }
      }
      // this.check = false
      // this.recognition.lang = 'en-US'
      // this.recognition.onend = this.reset()
      this.recognition.onend = () => {
        this.recognizing = false
      }
      this.recognition.onresult = (event) => {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.result += event.results[i][0].transcript
            // this.input.value = this.result
            console.log('return result: ', this.result)
            // this.$emit('clicked', this.result)
          } else {
            this.interimResult = event.results[i][0].transcript
            console.log('return interim result: ', this.interimResult)
          }
        }
      }
    },
    toggleStartStop: function (event) {
      if (this.recognizing) {
        this.recognition.stop()
        if (!this.check) this.onBtnStopClicked()
        // this.button.textContent = 'Click to Speak'
        this.microbutton.src = 'https://img.icons8.com/material/24/000000/microphone.png'
        console.log('stop recognizing')
        this.interimResult = ''
        this.recognizing = false

        this.$emit('clicked', this.result)
        
        console.log('check: ', this.recognizing)
      } else {
        this.recognition.start()
        if (!this.check) this.onBtnRecordClicked()
        this.microbutton.src = 'https://img.icons8.com/material/24/000000/block_microphone.png'
        this.input.focus()
        // this.button.textContent = 'Click to Stop'
        console.log('start recognizing')
        this.recognizing = true
        console.log('check: ', this.recognizing)
      }
    },
    CheckAPIrecord: function () {
      if (!navigator.mediaDevices.getUserMedia) {
        console.log('navigator.mediaDevices.getUserMedia is not supported')
      } else if (window.MediaRecorder === undefined) {
        console.log('Media Recorder is not supported')
      } else {
        navigator.mediaDevices.getUserMedia(this.constraints)
          .then((stream) => {
            this.localstream = stream
            this.localstream.getAudioTracks().forEach((track) => {
              if (track.kind === 'audio') {
                console.log('audio track.onended Audio track.readyState=', track.readyState, ', track.muted=', track.muted)
              }
            })
            try {
              var AudioContext = window.AudioContext || window.webkitAudioContext
              this.audioContext = new AudioContext()
              console.log('Web Audio API is supported')

              console.log(this.audioContext)
            } catch (e) {
              console.log('Web Audio API is not supported')
            }
          }).catch((err) => {
            console.log('navigator.getUserMedia error: ', err)
          })
        console.log('Web Audio API is online')
      }
    },
    onBtnRecordClicked: function () {
      console.log('Recording...')
      if (this.localstream == null) {
        console.log('Could not get local stream from mic')
      } else {
        console.log('Start Recording...')
        if (typeof MediaRecorder.isTypeSupported === 'function') {
          var option
          if (MediaRecorder.isTypeSupported('audio/wav')) {
            option = {mimeType: 'audio/wav'}
          } else if (MediaRecorder.isTypeSupported('audio/webm')) {
            option = {mimeType: 'audio/webm'}
          } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
            option = {mimeType: 'audo/webm;codes=opus'}
          }
          console.log('Using ', option.mimeType)
          this.mediaRecorder = new MediaRecorder(this.localstream, option)
        } else {
          console.log('isTypeSupported is not supported')
          this.mediaRecorder = new MediaRecorder(this.localstream)
        }
        this.mediaRecorder.ondataavailable = (e) => {
          this.chunks.push(e.data)
        }
        this.mediaRecorder.onerror = (e) => {
          console.log('mediaRecorder.onerror: ', e)
        }
        this.mediaRecorder.onstart = () => {
          console.log('mediaRecorder.onstart, mediaRecorder.state = ', this.mediaRecorder.state)
          this.localstream.getTracks().forEach((track) => {
            if (track.kind === 'audio') {
              console.log('onstart - Audio track.readyState = ', track.readyState, ', track.muted=', track.muted)
            }
          })
        }
        this.mediaRecorder.onstop = () => {
          console.log('mediaRecorder.onstop, mediaRecorder.state = ', this.mediaRecorder.state)

          var blob = new Blob(this.chunks, {type: 'audio/webm'})
          this.chunks = []

          var audioURL = window.URL.createObjectURL(blob)

          this.downloadLink.href = audioURL
          this.downloadLink.innerHTML = 'Download audio file'

          var rand = Math.floor((Math.random() * 10000000))
          var name = 'audio_' + rand + '.wav'

          this.downloadLink.setAttribute('download', name)
          this.downloadLink.setAttribute('name', name)
        }

        this.mediaRecorder.onwarning = (e) => {
          console.log('mediaRecorder.onwarning: ', e)
        }

        this.mediaRecorder.start(10)
      }
    },
    onBtnStopClicked: function () {
      this.mediaRecorder.stop()
    }
  }
}
</script>
