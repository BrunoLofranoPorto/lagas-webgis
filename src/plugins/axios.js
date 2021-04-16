import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue){
        Vue.prototype.$httpGeoServer = axios.create({
            baseURL: 'http://localhost:8600/geoserver'
        })
    }
})