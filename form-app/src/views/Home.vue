<template>
  <div class="home">
     <div id="map"></div>
    <HelloWorld msg="Welcome to Your Form App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      map: ''
    }
  },
  created () {
    console.log('form created ')
  },
  //
  mounted () {
    console.log('form mounted')
    this.map = this.$L.map('map', {
      center: [24.77803, 113.27734], // 地图中心
      zoom: 14, // 缩放比列
      zoomControl: false, // 禁用 + - 按钮
      doubleClickZoom: false, // 禁用双击放大
      attributionControl: false // 移除右下角leaflet标识
    })
    this.$L.tileLayer(
      'https://mt1.sea.utuapp.cn/440232/overlay/{z}/{x}/{y}.png'
    ).addTo(this.map)
    this.$L.tileLayer(
      'https://mt1.sea.utuapp.cn/440232/satellite/{z}/{x}/{y}.png'
    ).addTo(this.map)
    this.map.pm.addControls({
      position: 'topleft',
      drawPolygon: false, // 添加绘制多边形
      drawMarker: false, // 添加按钮以绘制标记
      drawCircleMarker: false, // 添加按钮以绘制圆形标记
      drawPolyline: false, // 添加按钮绘制线条
      drawRectangle: true, // 添加按钮绘制矩形
      drawCircle: false, //  添加按钮绘制圆圈
      editMode: true, //  添加按钮编辑多边形
      dragMode: true, //   添加按钮拖动多边形
      cutPolygon: true, // 添加一个按钮以删除图层里面的部分内容
      removalMode: true // 清除图层
    })
  },
  components: {
    HelloWorld
  }
}
</script>
<style scoped>
  #map {
    width: 100%;
    height: calc(100vh);
    z-index: 1;
  }
</style>
