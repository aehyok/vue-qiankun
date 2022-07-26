<template>
  <el-button type="primary" @click="open">oepn</el-button>
  <div id="map" style="width: 100vw; height: 800px"></div>
</template>
<script setup>
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import { onMounted } from 'vue'

let map = {}

const open = () => {
  map.pm.enableGlobalEditMode({
    allowSelfIntersection: false
  })
}
onMounted(() => {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })
  const array = [34.263742732916505, 108.01650524139406]

  // TODO  初始化map
  map = L.map('map', {
    zoom: 16,
    minZoom: 16,
    maxZoom: 22,
    center: [array[0], array[1]],
    zoomControl: true,
    doubleClickZoom: false,
    attributionControl: false,
    tap: false // 设置为false,阻止click事件执行两次
  })

  // TODO 设置图层
  const satellite = L.tileLayer('https://mt{s}.sea.utuapp.cn/610403/satellite/{z}/{x}/{y}.png', {
    subdomains: ['1', '2', '3', '4']
  })
  const overlay = L.tileLayer('https://mt{s}.sea.utuapp.cn/610403/overlay/{z}/{x}/{y}.png', {
    subdomains: ['1', '2', '3', '4']
  })

  const village = L.tileLayer(
    'https://mt{s}.sea.utuapp.cn/610403/models/610403102210/{z}/{x}/{y}.png',
    {
      subdomains: ['1', '2', '3', '4']
    }
  )
  // TODO 图层分组设置
  const layerGroup = L.layerGroup([satellite, overlay, village])
  layerGroup.addTo(map)

  const json = [
    {
      pane: '10001',
      fences: [
        {
          longitude: 108.0142602324486,
          latitude: 34.26235061851283
        },
        {
          longitude: 108.01443994045259,
          latitude: 34.262253080971156
        },
        {
          longitude: 108.01457136869433,
          latitude: 34.262348401751794
        },
        {
          longitude: 108.0144238471985,
          latitude: 34.26239052020185
        }
      ]
    },
    {
      pane: '10002',
      fences: [
        {
          longitude: 108.01374256610872,
          latitude: 34.26210234091152
        },
        {
          longitude: 108.01445603370668,
          latitude: 34.2618629296733
        },
        {
          longitude: 108.01394104957582,
          latitude: 34.26151267867119
        }
      ]
    },
    {
      pane: '10003',
      fences: [
        {
          longitude: 108.01560670137407,
          latitude: 34.261982635377585
        },
        {
          longitude: 108.0158427357674,
          latitude: 34.26185184580317
        },
        {
          longitude: 108.0158132314682,
          latitude: 34.26202475401081
        }
      ]
    }
  ]
  const arrayList = []

  json.forEach((item) => {
    const list = []
    if (item.fences && item.fences.length > 0) {
      item.fences.forEach((child) => {
        list.push([child.latitude, child.longitude])
      })
      arrayList.push({
        id: item.pane,
        fences: list
      })
    }
  })

  arrayList.forEach((element) => {
    // TODO 加载多边形
    const drawObj = L.polygon(element.fences, { color: 'orange', id: element.id }).addTo(map)
    drawObj.id = `${element.id}id`

    // TODO单个层进行编辑, 禁用编辑为disable
    drawObj.pm.enable({
      allowSelfIntersection: false
    })

    // TODO单个图层设置进行拖动，禁用拖动 disableLayerDrag
    // 如果想设置拖动状态前，先禁用其他状态
    drawObj.pm.enableLayerDrag()

    const lb = L.latLngBounds(element.fences)
    const center = lb.getCenter()
    const latlng = L.latLng(center.lat, center.lng)

    console.log(element, latlng, 'element-latlng')
    // TODO popup 弹窗
    // L.popup({
    //     keepInView: true,
    //     closeButton: false,
    // })
    // .setLatLng(latlng)
    // .setContent('地块名称信息')
    // .openOn(state.map);

    // TODO  通过Marker icon设置 label
    // var myIcon = L.divIcon({
    //     html: "狗子",
    //     className: 'my-div-icon',
    //     iconSize:40
    // });
    // L.marker([center.lat,center.lng], { icon: myIcon }).addTo(state.map);

    console.log(latlng, 'center')

    // TODO 小窗体ToolTip
    // drawObj.bindTooltip(
    //   "<div>My 1111111</div>",
    //   {
    //     direction:"center",
    //     permanent: true,
    //   }).openTooltip()

    drawObj.on('click', function (e) {
      // TODO  定位到center
      // state.map.flyTo({lat:34.261982635377585 , lng: 108.01560670137407})
      // let lb = L.latLngBounds(element.fences)

      // let latlng = L.latLng(lb.getCenter().lat, lb.getCenter().lng);
      // console.log(lb.getCenter(),'center')

      // state.map.flyTo(latlng, state.map.getZoom())

      if (e.sourceTarget.id) {
        console.log(e.sourceTarget.id, '地块Id 去获取数据', e)
      }
    })
    // this.drawObj.on("pm:edit", (obj) => {
    //   obj.target.setStyle({ color: "orange" })
    // });
  })
})
</script>
<style lang="scss" scoped>
.my-div-icon {
  color: white;
}
// ::v-deep .leaflet-popup-content {

// }
</style>
