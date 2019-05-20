// Products.vue

<template>
  <div class="products">
    <h1>{{ msg }}</h1>
    <h2>Products</h2>
    <div v-for='banner in banners' :key="banner.id">
        <img v-bind:src="banner.url" alt="banner">
    </div>
    <a v-for="menu in menus" :key='menu.tab'>
      <button><router-link v-bind:to="menu.name"> {{menu.name}} </router-link></button>
    </a>
    <template>
      <li v-for="product in products" :key="product">
        <h2>{{product.id}}</h2>
          <h3 v-for = "(item) in product.item" :key="item.id">
              {{ item.product }}: {{ item.price }}
          </h3>
      </li>
    </template>
    <h2>
      <router-link to="/">{{ message }}</router-link>
    </h2>
  </div>
</template>

<script>
import MenuService from '@/services/MenuService'
export default {
  name: 'products',
  data () {
    return {
      msg: 'Welcome to Products',
      message: 'See you again',
      products: null,
      menus: null,
      banners: null
    }
  },
  mounted () {
    // this.getProducts()
    // this.getBanner()
    // this.getMenubar()
    this.getMenuWithBanner()
  },
  methods: {
    async getMenuWithBanner () {
      await Promise.all([
        MenuService.fetchBanners()
          .then((result) => {
            this.banners = result.data
          }),
        MenuService.fetchMenus()
          .then((result) => {
            this.menus = result.data
          })
      ])
      await MenuService.fetchProducts()
        .then((result) => {
          this.products = result.data
        })
    }
  //   async getProducts () {
  //     await this.getMenubar()
  //     await this.getBanner()
  //     await MenuService.fetchProducts()
  //       .then((reponse) => {
  //         this.products = reponse.data
  //       })
  //   },
  //   getMenubar: function () {
  //     MenuService.fetchMenus()
  //       .then((reponse) => {
  //         this.menus = reponse.data
  //       })
  //   },
  //   getBanner: function () {
  //     MenuService.fetchBanners()
  //       .then((response) => {
  //         this.banners = response.data
  //       })
  //   }
  // }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
