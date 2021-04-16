<template>

    
	<div class="">
		<vmLayer
		name="default"
		:source="layer.props.source"
		type="fill"
		:classes="layer.classes"
		:paint="{ 'fill-color': '#daebe8', 'fill-opacity': 0.6  }"
		:paint-hover="{ 'fill-color': '#32CD32', 'fill-opacity': 0.5 }"
		:paint-click="{ 'fill-color': '#32CD32', 'fill-opacity': 0.5 }"
		multipleFeatureSelectionOn="alt"
		@featureselect="featureselect"
		>
		<!-- <template class="teste" v-slot:popupHover>
			<div class=""><h6> Here goes the pop up content while in <b>HOVER</b> a Feature.</h6></div>
		</template> -->

		<template v-slot:popupClick="slotProps">
			<VmPopup max-width="400px">
				{{ slotProps.features && slotProps.features[0] && slotProps.features[0].properties }}				
				<!-- <h6>Here goes the pop up content while in <b>CLICK</b> a Feature.</h6> -->
			</VmPopup>
		</template>
	</vmlayer>

	</div>

</template>

<script>
// 
 // 
export default {

	props: ['layer'],

	data() {
		return {
			features: false,
			opacity: 1
		}
	},	
	
	methods: {
		featureselect: function(layer) {
			if(Array.isArray(layer) && layer[0] && layer[0].features.properties) {
				this.features = layer[0].features.properties
			} else {
				this.features = false
			}
		}
	}

}
</script>

<style lang="stylus" scoped>


</style>