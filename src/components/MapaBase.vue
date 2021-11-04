<template>

	<div class="mapdiv">

		<VueMapbox
			:accessToken = accessKey
			mapStyle="mapbox://styles/felixxxguilherme/ckmzcla2e00kb17lkuubuh9i6"
			height="100%"
			width="100%"
			ref='mapbox'
			:zoom=11
			:interactive="true"
			:center="[-48, -15.8]"
		>

		<template v-for="(layer) in layers">

			<component
				v-if="layer.visible"
				:key="layer._id"
				:is="'layer-automatico'"
				:layer="layer"
				>
			</component>
		</template>

		<slot name="layers"> </slot>
		
		<vm-marker 
			v-for="(marker, idx) in markers" :key="idx"
            		color="red"
            		:center="marker.coordenadas">  

			<template v-slot:popupHover>
                		<b>{{popupcontent}}</b>
            		</template>
            		<template v-slot:popupClick>
                		<b> {{ marker.titulo }} </b>
            		</template>
       	 	</vm-marker>
		
		</VueMapbox>

	</div>
	
</template>

<script>
import DadosTDM from '../configuracaoDeMapa/configuracoesDeMarcadores.js'

export default {

	name: '',
	data() {
		return {
			accessKey: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
		}
	},

	created() {
	},

	computed: {

		layers: function () {
			return this.$store.getters['layers']
		},
		markers: function () {
			return DadosTDM.map(l => l)
		}
	},

	methods: {
	}
}
</script>


<style scoped lang="stylus">

.mapdiv
	position absolute
	top 0
	bottom 0
	z-index 0
	width 100%
	height 100vh
	overflow hidden

</style>
