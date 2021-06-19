<template>
    <div id="map" style=" width:1000px;height:1200px;"></div>
</template>
<script>
import { defineComponent, onMounted, reactive } from 'vue';
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
export default  defineComponent({
    setup() {
        const state = reactive({
        })

        let map = {}
        onMounted(()=> {
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
            L.tileLayer(
                'https://mt1.sea.utuapp.cn/220122/satellite/{z}/{x}/{y}.png',
                {
                    subdomains: ['1', '2', '3', '4'],
                }
            ).addTo(map);
            L.tileLayer(
                'https://mt1.sea.utuapp.cn/220122/overlay/{z}/{x}/{y}.png',
                {
                    subdomains: ['1', '2', '3', '4'],
                }
            ).addTo(map);
        })
    },
})
</script>