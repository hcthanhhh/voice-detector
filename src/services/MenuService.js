import Api from '@/services/Api'

export default {
  fetchMenus () {
    return Api().get('menu', {
      delay: 3000 // 3 secs
    })
  },
  fetchProducts () {
    return Api().get('products', {
      delay: 5000 // 5 secs
    })
  },
  fetchBanners () {
    return Api().get('banner', {
      delay: 2000 // 2 secs
    })
  }
}
