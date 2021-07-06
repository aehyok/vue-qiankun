<template>
    <div id="map" style="width:1000px;height:800px;"></div>
</template>
<script>
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { defineComponent, onMounted, reactive } from 'vue';
export default  defineComponent({
    name:'about',
    components: {
    },
    setup() {
        const state = reactive({
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

        state.map = L.map("map", {
            zoom: 16,
            minZoom: 16,
            maxZoom: 22,
            center: [array[0],array[1]],
            zoomControl: true,
            doubleClickZoom: false,
            attributionControl: false,
        });

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
            arrayList.push(
            {
                id: item.pane,
                fences: list
            }
            )
        }
        })

        arrayList.forEach((element) => {
        console.log(element,'el');

        let drawObj = L.polygon(element.fences, { color: "orange", id: element.id }).addTo(state.map)
        drawObj.id = element.id + 'id'

        // this.drawObj.bindTooltip(
        //   "<div style=\"background: red;\">My 1111111</div>",
        //   {
        //     direction:"center",
        //     permanent: true,
        //     opacity: '1'
        //   }).openTooltip()
        
        drawObj.on('click',function (e) {
            // this.map.fitBounds(drawObj.getBounds());
            if(e.sourceTarget.id) {
                console.log(e.sourceTarget.id, '地块Id 去获取数据')
            }
        })
        // this.drawObj.on("pm:edit", (obj) => {
        //   obj.target.setStyle({ color: "orange" })
        // });
        });
    })
    },
})
</script>
  