<template>
  <div id="app">
    <HelloWorld/>
    <VoiceRecognition @clicked="onClickChild"/>
     <p>result: {{result}}</p>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import VoiceRecognition from './components/VoiceRecognition.vue'
import HelloWorld from './components/HelloWorld.vue'
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
  components: {
    VoiceRecognition,
    HelloWorld
  },
  methods: {
    onClickChild: function (value) {
      this.result = value
      console.log('value', value)
    }
  }
}
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
