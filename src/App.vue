<template>
  <div id="app">
    <HelloWorld/>
    <!-- <VoiceRecognition @clicked="onClickChild"/> -->
    <p>result: {{result}}</p>
    <div id="voicesearch">
      <textarea id="searchtext" cols="30" rows="10"></textarea>
      <span v-voice-search.keyup.click="'searchtext'"><img src="https://img.icons8.com/material/24/000000/microphone.png" alt="" srcset=""></span>
    </div>
    <!-- <div id="voicerecorder">
      <span v-voice-recorder.keyup.click="'downloadlink'"><img src="https://img.icons8.com/material/24/000000/microphone.png" alt="" srcset=""></span>
      <a id="downloadlink"></a>
    </div> -->
    <!-- <router-view/> -->
  </div>
</template>

<script>
import VoiceRecognition from './components/VoiceRecognition.vue'
import HelloWorld from './components/HelloWorld.vue'
import {VoiceSearch} from './components/voicesearch.vue'
// import {voicerecorder} from './components/VoiceRecorder.vue'
// import Vue from 'vue'
export default {
  name: 'App',
  props: {
    method: {type: Function}
  },
  data () {
    return {
      result: ''
    }
  },
  directives: {
    VoiceSearch,
    // voicerecorder
  },
  components: {
    VoiceRecognition,
    HelloWorld
  },
  methods: {
    onClickChild: function (value) {
      if (value === 'say something!') this.result = 'Cannot recognize your voice!! Please try again!!'
      else this.result = value
      console.log('value', value)
    }
  }
}
// Vue.directives('voice-search', VoiceSearch);
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
