// Banner.vue

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Banner</h2>
    <a v-for="menu in menus" :key="menu.tab">
      <button><router-link v-bind:to="menu.name"> {{menu.name}} </router-link></button>
    </a>
    <div>
      <!-- <img src="@/assets/banner.png" alt="banner"> -->
      <div v-for='banner in banners' :key="banner.id">
        <img v-bind:src="banner.url" alt="banner">
      </div>
      <h2>
        <router-link to="/">{{ message }}</router-link>
      </h2>
    </div>
  </div>
</template>

<script>
import MenuService from '@/services/MenuService'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Banner',
      message: 'See you again',
      menus: null,
      banners: null
    }
  },
  mounted () {
    this.getMenubar()
    this.getBanner()
  },
  methods: {
    getMenubar: function () {
      MenuService.fetchMenus()
        .then((response) => {
          this.menus = response.data
        })
    },
    getBanner: function () {
      MenuService.fetchBanners()
        .then((response) => {
          this.banners = response.data
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
