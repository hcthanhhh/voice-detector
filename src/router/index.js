import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Menus from '../components/Menus'
import Products from '../components/Products'
import Banner from '../components/Banner'
import VoiceRecognition from '../components/VoiceRecognition'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/menu',
      name: 'Menus',
      component: Menus
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner
    },
    {
      path: '/voicerecognition',
      name: 'VoiceRecognition',
      component: VoiceRecognition
    }
  ]
})
