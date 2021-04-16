
<script>
import startCase from 'lodash/startCase'
import get from 'lodash/get'

export default {


  props: {
    /**
    * fields or feature-state to show in popup
    * @values  ['nome_municipio', { key: 'adequacao', label: 'Adequação', render: false | func }]
    */
    features: {
      type: [Array, String]
    },
    fields: {
      type: [Array, String]
    }
  },

  render (h) {
    const features = [];
    (this.features || []).forEach((feature, i) => {
      if (i > 0) features.push(h('hr', { class: 'mt-2' }))

      const fields = []
      if (this.fields === 'all') {
        Object.entries(feature.properties).forEach((item) => {
          const key = item[0]
          const value = item[1]
          fields.push(this.createField(h, startCase(key), value))
        })
      } else if (Array.isArray(this.fields)) {
        this.fields.forEach(field => {
          if (field?.constructor?.name === 'String') {
            fields.push(this.createField(h, get(feature.properties, field)), '')
          } else {
            const name = get(field, 'label', get(field, 'key'))
            let value = get(feature.properties, field?.key)
            if (field?.render?.constructor?.name === 'Function') {
              value = field.render(value)
            }
            fields.push(this.createField(h, name, value, field?.prefix))
          }
        })
      }
      // todo Include Feature State in all too



      features.push(h('div', { class: 'feature' }, fields))
    })

    return h('div', { class: 'popupfilds' }, features)
  },


  methods: {
    createField: function (h, fieldName = '', fieldValue = '', prefix = '') {
      let value = Array.isArray(fieldValue) ? fieldValue.join(', ') : fieldValue
      if (value?.constructor?.name === 'Number') {
        value = value.toLocaleString('pt-br')
      }
      if (prefix) {
        value = value + prefix
      }

      let child = []

      if (fieldName && !fieldValue) {
        child.push(h('div', { class: 'fieldname justname mb-1' }, fieldName))
      } else {
        child = [
          h('div', { class: 'fieldname' }, fieldName),
          h('div', { class: 'fieldvalue' }, value)
        ]
      }



      return h('div',
        {
          class: 'field_item in-cols mb-1'
        },
        child

      )
    }
  }

}
</script>

<style lang="stylus" scoped>
    .field_item{
        min-width 210px;
        margin-bottom:10px;
        font-size:14px;

        .fieldname{
            font-weight bolder
            max-width 35%
            width 35%
            opacity 0.7
            line-height 95%
        }

        .justname{
            width 100%
            max-width 100%
            margin-top:1em
            font-size:1.2em
            color:black
        }
        .fieldvalue{
            font-weight normal
            opacity 1
            line-height 95%
        }
    }
</style>
