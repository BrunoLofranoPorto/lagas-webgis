<script>
import Vue from 'vue'
import { VmLayer, VmPopup } from '@curupira/vue-mapbox'
import popupAutomatic from '../popups/pop-automatico'

export default {
  props: {
    layer: {
      type: Object
    }
  },
  // data () {
  //   return {
  //     open: false,
  //     myLayer: this.layer
  //   }
  // },

  // watch: {
  //   layer: function (newVal, oldVal) {
  //     this.myLayer = { ...this.layer }
  //   }
  // },

  render (h) {

    if (!this.layer) return null
    if (this.layer?.visible === false) return null

    return this.createVmLayer(h, this.layer)
  },

  methods: {

    createVmLayer: function (h, layer, parentLayer) {
      // set opacity from parent
      let opacity = parentLayer?.opacity ?? 1
      if (layer.opacity >= 0) {
        opacity *= layer.opacity
      }
      if (layer?.props?.opacity >= 0) {
        opacity *= layer.props.opacity
      }

      // get filter from current or parent
      const filter = ((layer?.props?.filter ?? layer?.filter) ?? parentLayer?.filter)



      const scopedSlots = {}
      const child = []

      // check for images

      const events = (layer?.on || parentLayer?.on) || {}

      // check for popup
      const popup = layer?.popup || parentLayer?.popup
      if (popup) {
        // const popupComponent = popup?.popupComponent || VmPopup
        const popupProps = popup.popupProps || { }
        const popupFields = popup.popupFields || []
        scopedSlots.popupHover = (items) => this.createPopup(h, items, popupProps, popupFields)
        scopedSlots.popupClick = (items) => this.createPopup(h, items, popupProps, popupFields)
      }


      // TODO - ver se componenteName nao é uma instancia ja
      let componentFinal = VmLayer
      if (layer?.componentName) {
        const customComponent = Vue.options.components?.[layer?.componentName]
        if (customComponent) {
          componentFinal = customComponent
        } else {
          console.error('Tentando usar uma layer que não foi registrada globalmente.')
        }
      }

      return h(componentFinal, {
        props: {
          ...layer.props,
          opacity: opacity,
          name: layer._id,
          filter: filter,
          layer: layer
        },
        on: events,
        scopedSlots: scopedSlots,
        // {
        //   popupHover: function (props) {
        //     return h(VmPopup, props, 'ola scoped')
        //   }
        // },
        key: layer._id
      },
      child)
    },

    createPopup: function (h, items, popupProps, popupFields) {
      // const popupContent = h(popupFields, { key: `${layer.name}-popup`, slot: 'default', props: { items: items?.features } } )
      const popupContent = h(popupAutomatic, { props: { fields: popupFields, features: items?.features } })
      return h(VmPopup, { props: { maxHeight: '40vh', maxWidth: '350px', textColor: '#ffffff', color: '#314559', ...popupProps } },
        [popupContent]
      )
    }


  }
}
</script>

<style lang="stylus">

</style>