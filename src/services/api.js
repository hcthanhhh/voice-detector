import axios from 'axios'
import delayAdapterEnhancer from 'axios-delay'

export default() => {
  return axios.create({
    adapter: delayAdapterEnhancer(axios.defaults.adapter),
    baseURL: 'http://localhost:80'
  })
}
