// HelloWorld.vue

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>HelloWorld page</h2>
    <a v-for="menu in menus" :key='menu.tab'>
      <button><router-link v-bind:to="menu.name"> {{menu.name}} </router-link></button>
    </a>
  </div>
</template>

<script>
import MenuService from '@/services/MenuService'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to HelloWorld',
      menus: null
    }
  },
  mounted () {
    this.getMenubar()
  },
  methods: {
    getMenubar: function () {
      MenuService.fetchMenus()
        .then((reponse) => {
          this.menus = reponse.data
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
