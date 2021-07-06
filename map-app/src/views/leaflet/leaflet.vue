<template>
    <div style="width:1000px;height:800px;">
        <l-map
            :zoom="zoom"
            :maxZoom="maxZoom"
            :min-zoom="minZoom"
            :center="center"
            :options="mapOptions"
            style="height: 100%"
            @click="clickMap"
        >
        <l-tile-layer
            :options ="options"
            v-for="(item,index) in overlay"
            :url="item"
            :key="'layer-'+index"
        >
      </l-tile-layer>  
        </l-map>
    </div>
</template>

<script>
    import 'leaflet/dist/leaflet.css'
    import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
    import { defineComponent, reactive, toRefs } from 'vue'
    export default defineComponent({
        components: {
            LMap,
            LTileLayer
        },
        setup(){
            let array = [34.276099180294885, 108.04684807582613]
            const state =reactive({
                zoom: 13,
                maxZoom: 22,
                minZoom: 13,
                center: [array[0],array[1]], 
                mapOptions: {
                    zoomSnap: 0.5,
                    attributionControl: false,
                },
                options: {
                    subdomains: ['1', '2', '3', '4'],
                },
                newOptions: {
                    minZoom: 10,
                    maxZoom: 22,
                    maxNativeZoom: 22,
                    subdomains: ['1', '2', '3', '4'],
                },

                overlay: [
                    'https://mt1.sea.utuapp.cn/610403/overlay/{z}/{x}/{y}.png',
                    'https://mt1.sea.utuapp.cn/610403/satellite/{z}/{x}/{y}.png',
                    'https://mt1.sea.utuapp.cn/610403/models/610403102210/{z}/{x}/{y}.png',
                ]
            })

            const clickMap = (e) => {
                console.log('clickMap', e)
            }
            return {
                ...toRefs(state),
                clickMap
            }
        }
    })
</script>