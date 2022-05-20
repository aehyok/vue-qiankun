import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import 'leaflet-contextmenu'
import 'leaflet-contextmenu/dist/leaflet.contextmenu.css'

export function useMap() {
  // 初始化入口
  const init = (centerPoint) => {
    console.log('进入hooks useMap')
    return initMap(centerPoint)
  }

  // TODO 初始化Map地图
  const initMap = (centerPoint) => {
    initMarkerIcon()
    let map = L.map('map', {
      zoom: 13,
      minZoom: 10,
      maxZoom: 22,
      center: centerPoint, //必须初始化center中心坐标
      doubleClickZoom: false, // 禁用双击放大
      zoomControl: false, // 不显示默认的放大缩小按钮，可通过control.zoom进行控制
      attributionControl: false,
      tap: false // 设置为false,阻止click事件执行两次
    })

    initControl(map)

    initTileLayer(map)

    initGeoman(map)
    return map
  }

  // TODO 设置marker标记的默认图片
  const initMarkerIcon = () => {
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
  }

  // TODO 初始化图层
  const initTileLayer = (map) => {
    const satellite = L.tileLayer('https://mt{s}.sea.utuapp.cn/610403/satellite/{z}/{x}/{y}.png', {
      subdomains: ['1', '2', '3', '4']
    })
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
    // TODO 图层分组
    const layerGroup = L.layerGroup([satellite, overlay, village])
    layerGroup.addTo(map)
  }

  // TODO 放大 缩小 按钮控制
  const initControl = (map) => {
    //TODO 设置为true
    // L.PM.setOptIn(true);
    L.control
      .zoom({
        position: 'bottomleft'
      })
      .addTo(map)
  }

  // TODO 编辑图层的基础设置
  const initGeoman = (map) => {
    // TODO 设置翻译语言
    map.pm.setLang('zh')

    // 设置绘制后的线条颜色等
    map.pm.setPathOptions({
      color: 'orange',
      fillColor: 'green',
      fillOpacity: 0.3
    })
  }

  // TODO 移除历史的Markers
  const removeHistoryMarkers = (e, map) => {
    // 只保留最后一次点击的Marker
    console.log(e, 'eee')
    map.eachLayer(function (layer) {
      if (layer.pm && layer.pm._shape === 'Marker' && e.marker._leaflet_id !== layer._leaflet_id) {
        layer.remove()
      }
    })
  }

  const removeAllMarkers = (map) => {
    // 只保留最后一次点击的Marker
    map.eachLayer(function (layer) {
      if (layer.pm && layer.pm._shape === 'Marker') {
        layer.remove()
      }
    })
  }

  const removePolygon = (map) => {
    // 只保留最后一次点击的Marker
    map.eachLayer(function (layer) {
      if (layer.pm && layer.pm._shape === 'Polygon') {
        layer.remove()
      }
    })
  }
  return {
    init,
    removeAllMarkers,
    removeHistoryMarkers,
    removePolygon
  }
}
