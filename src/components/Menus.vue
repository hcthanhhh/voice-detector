// Menus.vue

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Menu page</h2>
    <a v-for="menu in menus" :key='menu.tab'>
      <button><router-link v-bind:to="menu.name"> {{menu.name}} </router-link></button>
    </a>
    <h2>
      <router-link to="/">{{message}}</router-link>
    </h2>
  </div>
</template>

<script>
import MenuService from '@/services/MenuService'
export default {
  name: 'menu',
  data () {
    return {
      msg: 'Welcome to Menu',
      message: 'See you again',
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
