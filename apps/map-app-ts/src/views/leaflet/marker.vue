<template>
  <v-contextmenu ref="contextMenu">
    <v-contextmenu-group title="">
      <v-contextmenu-item @click="saveMarker">
        <img :src="url" class="right-image-size" />
      </v-contextmenu-item>
      <v-contextmenu-item @click="deleteMarker">
        <img :src="url" class="right-image-size" />
      </v-contextmenu-item>
    </v-contextmenu-group>
  </v-contextmenu>
  <div id="map" ref="refMap" class="leaflet-map-class" v-contextmenu:contextMenu></div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useMessage } from '@aehyok/utils'
import { directive, Contextmenu, ContextmenuItem, ContextmenuGroup } from 'v-contextmenu'
import { useMap } from './useMap'
import 'v-contextmenu/dist/themes/default.css'

const { warnMessage, successMessage } = useMessage
export default defineComponent({
  directives: {
    contextmenu: directive
  },
  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    [ContextmenuGroup.name]: ContextmenuGroup
  },
  setup() {
    let map = {}
    const state = reactive({
      url: '../images/map-app/btn-save-normal.png',
      markerPoint: {
        longitude: 0,
        latitude: 0
      } // Marker标记
    })
    const contextMenu = ref(null)
    const refMap = ref(null)
    const open = () => {
      console.log('open', refMap.value)
      const targetDimensions = refMap.value.getBoundingClientRect()

      const postition = {
        top: Math.random() * targetDimensions.height + targetDimensions.top + window.scrollY,
        left: Math.random() * targetDimensions.width + targetDimensions.left + window.scrollX
      }
      console.log()
      contextmenu.value.show(postition)
    }

    function deleteMarker(e) {
      console.log('deleteMarker')
      if (state.markerPoint.longitude === 0 || state.markerPoint.latitude === 0) {
        warnMessage('请先进行标记')
      } else {
        removeAllMarkers(map)
        successMessage('标记移除成功')
        state.markerPoint.longitude = 0
        state.markerPoint.latitude = 0
      }
    }

    function saveMarker(e) {
      if (state.markerPoint.longitude === 0 || state.markerPoint.latitude === 0) {
        warnMessage('请先进行标记')
      }
    }
    const { init, removeAllMarkers } = useMap()
    onMounted(() => {
      map = init([34.263742732916505, 108.01650524139406])
      map.on('click', function (e) {
        state.markerPoint.longitude = e.latlng.lng
        state.markerPoint.latitude = e.latlng.lat
        removeAllMarkers(map)
        const temp = L.marker([state.markerPoint.latitude, state.markerPoint.longitude], {
          draggable: true
        }).addTo(map)

        temp.on('moveend', function (e) {
          console.log(e, 'dragend')
        })
      })
    })
    return {
      ...toRefs(state),
      open,
      refMap,
      contextMenu,
      saveMarker,
      deleteMarker
    }
  }
})
</script>
<style lang="scss" scoped>
.leaflet-map-class {
  width: calc(100vw - 270px);
  height: calc(100vh - 90px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.operation {
  position: absolute;
  z-index: 10000;
  top: 20px;
  right: 10px;
  padding: 2px;
  height: 30px;
}
.right-image-size {
  width: 18px;
  height: 18px;
}
</style>
