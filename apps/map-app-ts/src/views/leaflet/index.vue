<template>
  <!-- <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :before-upload="beforeUpload"
    :on-success="onSuccess">
  <el-button size="small" type="primary">点击上传</el-button>
  <template #tip>
    <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
  </template>
</el-upload> -->
  <!-- <v-contextmenu ref="contextmenu">
    <v-contextmenu-item>菜单1</v-contextmenu-item>
    <v-contextmenu-item>菜单2</v-contextmenu-item>
    <v-contextmenu-item>菜单3</v-contextmenu-item>
  </v-contextmenu> -->

  <v-contextmenu ref="rightMenu">
    <v-contextmenu-group title="">
      <v-contextmenu-item :hide-on-click="false" @click="plot"> 添加菜单 </v-contextmenu-item>
      <v-contextmenu-item :hide-on-click="false" @click="plot"> 添加菜单组 </v-contextmenu-item>
      <v-contextmenu-item :hide-on-click="false" @click="plot"> 添加子菜单 </v-contextmenu-item>
      <v-contextmenu-item :hide-on-click="false" @click="plot"> 删除 </v-contextmenu-item>
    </v-contextmenu-group>
  </v-contextmenu>
  <el-button type="primary" @click="mark">绘制标记</el-button>
  <el-button type="primary" @click="plot">绘制多边形</el-button>
  <el-button type="primary" @click="drag">拖动多边形</el-button>
  <el-button type="primary" @click="edit">编辑多边形</el-button>
  <el-button type="primary" @click="open">绘制多边形</el-button>
  <div id="map" style="width: 1000px; height: 1200px" v-contextmenu:rightMenu></div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import '../../../public/L.KML.js'
import { directive, Contextmenu, ContextmenuItem, ContextmenuGroup } from 'v-contextmenu'
// import "v-contextmenu/dist/themes/default.css";
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
    const rightMenu = ref(null)
    const state = reactive({
      markerPoint: {}
    })

    const mark = () => {
      map.pm.enableDraw('Marker', {})
    }
    const plot = () => {
      console.log('open')
      map.pm.enableDraw('Polygon', {
        pinning: true,
        snappable: true, // 可吸附于附近的某一个点
        measurements: { measurement: true }
      })
    }

    const edit = () => {
      map.pm.enable({
        allowSelfIntersection: false
      })
    }
    const drag = () => {
      console.log('drag')
      map.pm.enableGlobalDragMode()
    }

    const beforeUpload = (file) => {
      console.log(file, 'beforeUpload----上传文件')
      const fileReader = new FileReader()
      fileReader.readAsBinaryString(file)

      fileReader.onload = () => {
        console.log(fileReader.result, 'fileReader.result')
        const parser = new DOMParser()
        const kml = parser.parseFromString(fileReader.result, 'text/xml')
        const track = new L.KML(kml)
        console.log(track, 'track')
        map.addLayer(track)

        // Adjust map to show the kml
        const bounds = track.getBounds()
        map.fitBounds(bounds)
      }
    }

    const onSuccess = (response, file, fileList) => {
      console.log('success----on', response, file)
    }

    const contextMenuClick = () => {
      console.log(rightMenu.value)
      rightMenu.value.show()
    }
    onMounted(() => {
      delete Icon.Default.prototype._getIconUrl
      Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      })

      const array = [34.263742732916505, 108.01650524139406]
      map = L.map('map', {
        zoom: 13,
        minZoom: 10,
        maxZoom: 22,
        center: [array[0], array[1]],
        zoomControl: true,
        doubleClickZoom: false,
        attributionControl: false
      })

      map.on('click', function (ev) {
        console.log(ev, 'map--click')
      })

      map.pm.setLang('zh')

      // 设置绘制后的线条颜色等
      map.pm.setPathOptions({
        color: 'orange',
        fillColor: 'green',
        fillOpacity: 0.3
      })

      // 图层创建成功结束时调用的方法（目前针对Marker和Polygon多边形）
      map.on('pm:create', (e) => {
        // Polygon 多边形
        if (e.shape === 'Polygon') {
          console.log('绘制多边形', e)
        }

        // Marker标记
        if (e.shape === 'Marker') {
          state.markerPoint
          console.log(e, '绘制Marker')
        }

        e.layer.on('click', function () {
          console.log('创建了图层后的click事件')
        })

        e.layer.on('pm:edit', (event) => {
          // 修改坐标
          console.log(event, 'pm:edit拖动')
        })
      })

      const satellite = L.tileLayer(
        'https://mt{s}.sea.utuapp.cn/610403/satellite/{z}/{x}/{y}.png',
        {
          subdomains: ['1', '2', '3', '4']
        }
      )
      const overlay = L.tileLayer('https://mt{s}.sea.utuapp.cn/610403/overlay/{z}/{x}/{y}.png', {
        subdomains: ['1', '2', '3', '4']
      })
      // 村的正射影像
      const village = L.tileLayer(
        'https://mt{s}.sea.utuapp.cn/610403/models/610403102210/{z}/{x}/{y}.png',
        {
          subdomains: ['1', '2', '3', '4'],
          minZoom: 10,
          maxZoom: 22 // 默认最大值位18，19后就看不到此图层
        }
      )
      // 图层分组
      const layerGroup = L.layerGroup([satellite, overlay, village])
      layerGroup.addTo(map)

      const greenIcon = L.icon({
        iconUrl: 'leaf-green.png',
        shadowUrl: 'leaf-green.png',
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      })

      // 控制图层
      const controls = L.control
        .layers({
          杨陵: layerGroup,
          农安: layerGroup
        })
        .addTo(map)
      controls.expand() // 是否展开显示
      L.marker([44.41318342260997, 125.1389239572005], {
        icon: greenIcon,
        pmIgnore: true
      }).addTo(map)
    })
    return {
      plot,
      drag,
      mark,
      edit,
      contextMenuClick,
      beforeUpload,
      onSuccess
    }
  }
})
</script>
<style lang="scss" scoped>
:deep(.v-contextmenu-item) {
  display: inline-block;
}
</style>
