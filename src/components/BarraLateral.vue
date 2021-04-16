<template>
  <div id="sidebar">
    <div id="sidebar_header" class="mt-2">
      <div class="logo">
        <img src="/images/lagas_logo.png" alt="" />
      </div>
    </div>

    
      <div class="mt-2">
        
        <!-- Base Camadas Layers -->

        <div :class="{ 'border--active': layer.visible }" class="layer_button grid-1 grid-md-5 mt-1 in-cols j-start a-center" @click="toogleLayerVisibility(layer)"
          v-for="(layer, index) in this.$store.getters['layers']"
          :key="index"
        >
          <div class="col-1 layer_button-bar" :class="{ 'layer--active': layer.visible }">
          </div>
          <div class="col-3 layer_button-label">                   
              {{ layer.name }}
          </div>
          <div class="col-1 layer_button-download">
            <a v-if="layer.downloadLink" v-bind:href="`${layer.downloadLink}`">
              <img src="/images/download.png">
            </a>            
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      myLayer: null
      };
  },

  methods: {
      toogleLayerVisibility: function (layer) {
        this.$store.commit("toggleLayer", layer);
        }
    }
};
</script>

<style scoped lang="stylus">

@import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

#sidebar {
  margin-left: 1em;
  padding: 0;
  position: absolute;
  z-index: 5;
  user-select: none;
  transition: all 400ms 100ms;

  &:hover {
    margin-left: 1em;
  }
}

.sidebar_header {
  transition: all 400ms 100ms;
  z-index: 5;
}

.logo {
  position: relative;

  img {
    max-width: 200px;
    max-height: 150px;
    width: auto;
    height: auto;
  }
}

.layer_button {
  
  height 40px
  background-color #5d5d5a
  opacity 1
  border-radius 12px

  display flex
  justify-content flex-start
  flex-direction row 
  align-items left

  cursor pointer

}

.layer_button-bar {
  background-color #b2b2b2
  opacity 0.3
  height 100%
  width 20px
  border-radius 8px 0px 0px 8px
}

.layer_button-label {
  color white
  font-family: 'Work Sans', sans-serif
}

.layer_button-download {

  img {
    max-width 20px
    max-height 20px
    margin 5px 5px 0px 0px
  }
}

// active

.layer--active {
  background-color #65bd3b
  border-color #65bd3b
  opacity 1
}

.border--active {
  border solid 3px #65bd3b
}

</style>