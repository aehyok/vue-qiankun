<template>
    <el-button type="info" @click="open">open</el-button>
    <div id="map" style=" width:1000px;height:1200px;"></div>
</template>
<script>
import { defineComponent, onMounted } from 'vue';
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
export default  defineComponent({
    setup() {
        let map = {}

        const open = () => {
            console.log('open')
        }

        onMounted(()=> {
            delete Icon.Default.prototype._getIconUrl;
            Icon.Default.mergeOptions({
                iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            });

            let array = [44.41318342260997, 125.1389239572005]
            map = L.map("map", {
                zoom:10,
                minZoom: 10,
                maxZoom: 18,
                center: [array[0],array[1]],
                zoomControl: true,
                doubleClickZoom: false,
                attributionControl: false,
            });

            map.pm.addControls({
                position: "topleft",
                editMode: true, //  添加按钮编辑多边形
                dragMode: true, //   添加按钮拖动多边形
                cutPolygon: true, // 添加一个按钮以删除图层里面的部分内容
                removalMode: true, // 清除图层
                drawPolygon: true, // 添加绘制多边形
                drawMarker: true, // 添加按钮以绘制标记
                drawCircleMarker: true, // 添加按钮以绘制圆形标记
                drawPolyline: true, // 添加按钮绘制线
                drawRectangle: true, // 添加按钮绘制矩形
                drawCircle: true, //  添加按钮绘制圆圈
            });

            map.pm.setLang('zh');

            map.pm.setGlobalOptions(
            { 
                pinning: true, 
                snappable: true,   // 可吸附于附近的某一个点
                measurements: { measurement: true } 
            });

            const satellite = L.tileLayer(
                'https://mt{s}.sea.utuapp.cn/220122/satellite/{z}/{x}/{y}.png',
                {
                    subdomains: ['1', '2', '3', '4'],
                }
            );
            const overlay = L.tileLayer(
                'https://mt{s}.sea.utuapp.cn/220122/overlay/{z}/{x}/{y}.png',
                {
                    subdomains: ['1', '2', '3', '4'],
                }
            );

            // 图层分组
            const layerGroup = L.layerGroup([satellite, overlay])
            layerGroup.addTo(map)

            var greenIcon = L.icon({
                iconUrl: 'leaf-green.png',
                shadowUrl: 'leaf-green.png',
                iconSize:     [38, 95], // size of the icon
                shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });


            // 控制图层
            const controls = L.control.layers({
                杨陵: layerGroup,
                农安: layerGroup
            }).addTo(map)
            controls.expand() // 是否展开显示
            L.marker([44.41318342260997, 125.1389239572005],{ icon: greenIcon, pmIgnore: true}).addTo(map);
        })
        return {
            open
        }
    },
})
</script>
