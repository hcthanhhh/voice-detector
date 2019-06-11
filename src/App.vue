<template>
  <div id="app">
    <HelloWorld/>
    <!-- <VoiceRecognition @clicked="onClickChild"/> -->
    <p>result: {{result}}</p>
    <input v-voice-search/>
    <button v-voice-search:record>Click</button>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import VoiceRecognition from './components/VoiceRecognition.vue'
import HelloWorld from './components/HelloWorld.vue'
import {VoiceSearch} from './components/voicesearch.vue'
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
    VoiceSearch
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
