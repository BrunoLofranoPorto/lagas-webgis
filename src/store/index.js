import Vue from 'vue'
import Vuex from 'vuex'

import set from 'lodash/set'
import find from 'lodash/find'
import filter from 'lodash/filter'
import cloneDeep from 'lodash/cloneDeep'

import { LAYERS_DEFAULT } from '../configuracaoDeMapa/configuracoesDeLayers.js'
import { addIdToLayers, normalizeLayers, serializeLayers } from './mapStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layers: normalizeLayers(addIdToLayers(LAYERS_DEFAULT))
  },
  mutations: {
      setCurrentState: function (state, obj) {
          Object.entries(obj).forEach((item) => {
            const key = item[0]
            const value = item[1]
            if (Array.isArray(value)) {
              state[key] = [...value]
            } else if (typeof value === 'object') {
              state[key] = { ...value }
            } else {
              state[key] = value
            }
          })
        },
        
        toggleLayer: function (state, layer) {
          const layers = cloneDeep(state.layers)
          const currendLayer = find(layers, { _id: layer._id })
          if (layer.toggleGroup) {
            const previusVisibleLayer = find(layers, { toggleGroup: layer.toggleGroup, visible: true })
            if (previusVisibleLayer && previusVisibleLayer._id != layer._id) {
              previusVisibleLayer.visible = false
            }
          }
          currendLayer.visible = !currendLayer.visible
          state.layers = cloneDeep(layers)
        },

        deleteLayer: function (state, layer) {
      
          const layers = cloneDeep(state.layers)
          const currendLayers = filter(layers, l => (l._id !== layer._id && l._parentId !== layer._id))
          state.layers = currendLayers
        },

        setLayerProperties: function (state, { layer, prop, value }) {
          const layers = [...state.layers]
          const currendLayer = find(layers, { _id: layer._id })
          set(currendLayer, prop, value)
          state.layers = layers
        }
  },

  actions: {

  },

  getters: {

      layers: (state) => {
    
          // make a copy of layer to not change original normalize layers
          const layers = cloneDeep(state.layers)    
    
          console.count('updateLayersStore   *******')
    
          // for each layer, update source with filter or not
          layers.forEach(layer => {
            // mount filters needed
            if (!layer?.props?.source) {
              return
            }
            const source = cloneDeep(layer.props.source)

            if (source.type === 'geojson' && filter.length > 0) {
              // TODO - add geojson olgic
              // layer.source.tiles[0] = layer.source.tiles[0] + '?' + filter.join('&')
            }

            layer.props.source = source

          })        
    
          const layersFinal2 = serializeLayers(layers)
          // pass Layer Sources to Add filters
    
          return layersFinal2
        }
  }
})
