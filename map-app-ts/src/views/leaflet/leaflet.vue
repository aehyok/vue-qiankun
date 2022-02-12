<template>
    <div id="map" style="width:100vw;height:800px;"></div>
    <el-popover
  placement="right"
  :width="400"
  trigger="click"
>
    <template #reference>
        <el-button>click 激活</el-button>
    </template>
    <el-table :data="state.gridData">
        <el-table-column width="150" property="date" label="日期"></el-table-column>
        <el-table-column width="100" property="name" label="姓名"></el-table-column>
        <el-table-column width="300" property="address" label="地址"></el-table-column>
    </el-table>
    </el-popover>
</template>
<script setup>
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, reactive, toRefs } from 'vue';
    let map= {}
    const state = reactive({
        longitude: 0,  //经度
        latitude:  0,  //纬度
        altitude: 0,   // 高度
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
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
            let marker = L.marker([event.latlng.lat,event.latlng.lng],{
                draggable: true
            }).addTo(map);

            // TODO marker 拖拽结束事件
            marker.on('dragend',function(e){
                console.log('dragend',e)
            })

            // TODO marker 移动结束事件
            marker.on('moveend',function(e){
                console.log('moveend',e)
            })
            marker.on('click',function(e){
                console.log('click',e)
                alert('')
            })
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