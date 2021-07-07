<template>
    <div id="map" style="width:100vw;height:800px;"></div>
</template>
<script setup>
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, reactive } from 'vue';
    let map= {}
    const state = reactive({
        longitude: 0,  //经度
        latitude:  0,  //纬度
        altitude: 0,   // 高度
    })
    onMounted(() => {
        // TODO 设置marker标记的默认图片
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
        let array = [34.263742732916505, 108.01650524139406]

        //TODO  初始化map
        map = L.map("map", {
            zoom: 16,     // 设置初始进入的zoom
            minZoom: 13,  // 可缩小的最小值
            maxZoom: 20,   // 可放大的最大值,取决定性作用，设置为20了，则其他设置更大也无效。
            center: [array[0],array[1]],
            zoomControl: true,
            doubleClickZoom: false,
            attributionControl: false,
            tap: false, // 设置为false,阻止click事件执行两次
        });

        // Marker标记图层
        const layerGroupMarkers = L.layerGroup()
        layerGroupMarkers.addTo(map)

        map.on("zoomend", (event) => {
            console.log(event, 'zoomend')
        })

        // 地图单击事件
        map.on('click',function(event) {
            // 清除所有的Marker图层
            layerGroupMarkers.clearLayers()

            //TODO  通过Marker icon设置 label
            var myIcon = L.divIcon({
                html: "狗子",
                className: 'my-div-icon',
                iconSize:40
            });

            // 获取经纬度后生成marker,并添加到对应的图层
            let marker = L.marker([event.latlng.lat,event.latlng.lng]).addTo(map);
            state.longitude = event.latlng.lng
            state.latitude = event.latlng.lat
            // state.altitude = 0
            layerGroupMarkers.addLayer(marker)
        })
        
        // TODO 瓦片图层
        const satellite = L.tileLayer(
            'https://mt{s}.sea.utuapp.cn/610403/satellite/{z}/{x}/{y}.png',
            {
                subdomains: ['1', '2', '3', '4'],
                minZoom: 10,
                maxZoom: 20,  // 默认最大值位18，19后就看不到此图层
            }
        );

        // 路网图层
        const overlay = L.tileLayer(
            'https://mt{s}.sea.utuapp.cn/610403/overlay/{z}/{x}/{y}.png',
            {
                subdomains: ['1', '2', '3', '4'],
                minZoom: 10,
                maxZoom: 20, // 默认最大值位18，19后就看不到此图层
            }
        );
        
        // 村的正射影像
        const village = L.tileLayer(
            'https://mt{s}.sea.utuapp.cn/610403/models/610403102210/{z}/{x}/{y}.png',
            {
                subdomains: ['1', '2', '3', '4'],
                minZoom: 10,
                maxZoom: 22, // 默认最大值位18，19后就看不到此图层
            }
        );
        // TODO 地图图层单独为一个图层组（并且图层是有顺序的，先 satellite、overlay、village）
        const layerGroup = L.layerGroup([satellite,overlay,village])
        layerGroup.addTo(map)
    })
</script>
<style lang="scss" scoped>
    .my-div-icon {
        color: white;
    }
</style>