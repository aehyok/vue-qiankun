<template>
    <div id="map" style="width:100vw;height:800px;"></div>
</template>
<script setup>
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, reactive } from 'vue';
    let state = reactive({
        map: {},
        drawObj: {}
    })
    onMounted(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
        let array = [34.263742732916505, 108.01650524139406]

        //TODO  初始化map
        state.map = L.map("map", {
            zoom: 16,
            minZoom: 16,
            maxZoom: 22,
            center: [array[0],array[1]],
            zoomControl: true,
            doubleClickZoom: false,
            attributionControl: false,
        });
        
        // TODO 设置图层
        const satellite = L.tileLayer(
            'https://mt{s}.sea.utuapp.cn/610403/satellite/{z}/{x}/{y}.png',
            {
                subdomains: ['1', '2', '3', '4'],
            }
        );
        const overlay = L.tileLayer(
            'https://mt{s}.sea.utuapp.cn/610403/overlay/{z}/{x}/{y}.png',
            {
                subdomains: ['1', '2', '3', '4'],
            }
        );
        
        const village = L.tileLayer(
            'https://mt{s}.sea.utuapp.cn/610403/models/610403102210/{z}/{x}/{y}.png',
            {
                subdomains: ['1', '2', '3', '4'],
            }
        );
        // 图层分组
        const layerGroup = L.layerGroup([satellite, overlay,village])
        layerGroup.addTo(state.map)

        const json =[
            {
                "pane":'10001',
                "fences": [
                    {
                        "longitude": 108.0142602324486,
                        "latitude": 34.26235061851283,
                    },
                    {
                        "longitude": 108.01443994045259,
                        "latitude": 34.262253080971156,
                    },
                    {
                        "longitude": 108.01457136869433,
                        "latitude": 34.262348401751794,
                    },
                    {
                        "longitude": 108.0144238471985,
                        "latitude": 34.26239052020185,
                    }
                ],
            },
            {
                "pane":'10002',
                "fences": [
                    {
                        "longitude": 108.01374256610872,
                        "latitude": 34.26210234091152,
                    },
                    {
                        "longitude": 108.01445603370668,
                        "latitude": 34.2618629296733,
                    },
                    {
                        "longitude": 108.01394104957582,
                        "latitude": 34.26151267867119,
                    }
                ],
            },
            {
                "pane":'10003',
                "fences": [
                    {
                        "longitude": 108.01560670137407,
                        "latitude": 34.261982635377585,
                    },
                    {
                        "longitude": 108.0158427357674,
                        "latitude": 34.26185184580317,
                    },
                    {
                        "longitude": 108.0158132314682,
                        "latitude": 34.26202475401081,
                    }
                ],
            }
        ]
        let arrayList = []

        json.forEach(item => {
            let list = []
            if (item.fences && item.fences.length > 0) {
                item.fences.forEach(child => {
                    list.push([child.latitude,child.longitude])
                })
                arrayList.push({
                    id: item.pane,
                    fences: list
                })
            }
        })

        arrayList.forEach((element) => {
        console.log(element,'el');

        // TODO 加载多边形
        let drawObj = L.polygon(element.fences, { color: "orange", id: element.id }).addTo(state.map)
        drawObj.id = element.id + 'id'

        let lb = L.latLngBounds(arrayList[0].fences)
        let center = lb.getCenter()
        let latlng = L.latLng(center.lat, center.lng);

        var popup = L.popup({
            keepInView: true,
            closeButton: false,
            className: "popup-class"
        })
        .setLatLng(latlng)
        .setContent('地块名称信息')
        .openOn(state.map);

        

        //TODO  通过Marker icon设置 label
        // var myIcon = L.divIcon({
        //     html: "狗子",
        //     className: 'my-div-icon',
        //     iconSize:40
        // });
        // L.marker([center.lat,center.lng], { icon: myIcon }).addTo(state.map);

        console.log(latlng,'center')

        // TODO 小窗体ToolTip
        // drawObj.bindTooltip(
        //   "<div>My 1111111</div>",
        //   {
        //     direction:"center",
        //     permanent: true,
        //   }).openTooltip()
        
        drawObj.on('click',function (e) {

            //TODO  定位到center
            // state.map.flyTo({lat:34.261982635377585 , lng: 108.01560670137407})
            let lb = L.latLngBounds(arrayList[0].fences)

            let latlng = L.latLng(lb.getCenter().lat, lb.getCenter().lng);
            console.log(lb.getCenter(),'center')

            state.map.flyTo(latlng, state.map.getZoom())

            if(e.sourceTarget.id) {
                console.log(e.sourceTarget.id, '地块Id 去获取数据',e)
            }
        })
        // this.drawObj.on("pm:edit", (obj) => {
        //   obj.target.setStyle({ color: "orange" })
        // });
        });
    })
</script>
<style lang="scss" scoped>
    .my-div-icon {
        color: white;
    }
    .popup-class{
        width:50px;
        height: 24px;
        background: blueviolet;
    }
    // ::v-deep .leaflet-popup-content {
        
    // }
</style>