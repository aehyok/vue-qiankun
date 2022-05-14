import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useStore } from 'vuex'
import {
    warnMessage
  } from "../utils/message";
export function useMap() {
    const satelliteUrl = window.config.VUE_APP_MAP_SATELLITE //"https://mt{s}.sea.utuapp.cn/610403/satellite/{z}/{x}/{y}.png"
    const overlayUrl =  window.config.VUE_APP_MAP_OVERLAY // "https://mt{s}.sea.utuapp.cn/610403/overlay/{z}/{x}/{y}.png"
    const villageUrlList = window.config.VUE_APP_MAP_VILLAGE  // ["https://mt{s}.sea.utuapp.cn/610403/models/610403102210/{z}/{x}/{y}.png"]
    const store = useStore()
    const init = () => {
        let centerPoint = window.config.VUE_APP_CENTER
        return initMap(centerPoint)
    }

    const initMapBase = (centerPoint) => {
        initMarkerIcon()
        let map = L.map("lefletMap", {
            zoom: window.config.VUE_APP_ZOOM,
            minZoom: window.config.VUE_APP_MIN_ZOOM,
            maxZoom: window.config.VUE_APP_MAX_ZOOM,
            center: centerPoint,  
            doubleClickZoom: false,
            zoomControl: false, 
            attributionControl: false,
            tap: false, 
        });

        initControl(map)
        store.commit('clear')
        removeAllPlot(map)
        return map
    }

    const initMap = (centerPoint) =>{

        let map = initMapBase(centerPoint)

        initTileLayer(map, true)

        initGeoman(map)

        return map
    }

    const initMarkerIcon = () => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
    }

    // isVillage 是否初始化村的正射地图， true 则需要设置
    const initTileLayer = (map,isVillage) => {
        const satellite = L.tileLayer(
            satelliteUrl,
            {
                maxZoom: window.config.VUE_APP_MAX_ZOOM,
                maxNativeZoom: window.config.VUE_APP_MAX_NATIVE_ZOOM,
                subdomains: ["1", "2", "3", "4"],
            }
        );
        const overlay = L.tileLayer(
            overlayUrl,
            {
                maxZoom: window.config.VUE_APP_MAX_ZOOM,
                maxNativeZoom: window.config.VUE_APP_MAX_NATIVE_ZOOM,
                subdomains: ["1", "2", "3", "4"],
            }
        );

        let array = []

        if(isVillage) {  
            villageUrlList.forEach(item => {
                const village = L.tileLayer(
                    item,
                    {
                        subdomains: ["1", "2", "3", "4"],
                        minZoom: window.config.VUE_APP_MIN_ZOOM_Village,
                        maxZoom: window.config.VUE_APP_MAX_ZOOM_Village,
                    }
                );
                array.push(village)
            })
        }
        
        const layerGroup = L.layerGroup([satellite, overlay, ...array]);
        layerGroup.addTo(map);
    }

    const initControl = (map) => {
        L.control
        .zoom({
        position: "topright",
        })
        .addTo(map);
    }

    const initGeoman = (map) => {
        map.pm.setLang("zh");
        map.pm.disableGlobalEditMode()
        map.pm.setPathOptions({
            color: "orange",
            fillColor: "green",
            fillOpacity: 0.3,
        });
    }

    const removeHistoryMarkers = (e, map) => {
        map.eachLayer(function (layer) {
            if (
            layer.pm &&
            layer.pm._shape === "Marker" &&
            e.marker._leaflet_id !== layer._leaflet_id
            ) {
            layer.remove();
            }
        });
    }

    const removeAllMarkers = (map) => {
        map.eachLayer(function (layer) {
            if (
            layer.pm &&
            layer.pm._shape === "Marker"
            ) {
            layer.remove();
            }
        });
    }

    const removeAllPolygons = (map) => {
        map.eachLayer(function (layer) {
            if (
            layer.pm &&
            layer.pm._shape === "Polygon"
            ) {
                layer.remove();
            }
        });
    }

    const removeAllPlot = (map) => {
        map.eachLayer(function (layer) {
            if (
            layer.pm &&
            (layer.pm._shape === "Polygon" || layer.pm._shape === "Marker")
            ) {
                layer.remove();
            }
        });
    }

    const editPolygon = (map) => {
        if (state.plotPolygon.length === 0) {
            warnMessage("请先进行标绘");
            return false;
        }
        map.pm.enableGlobalEditMode();
    };

    const removePolygon = (map) => {
        map.eachLayer(function (layer) {
            if (
            layer.pm &&
            layer.pm._shape === "Polygon"
            ) {
            layer.remove();
            }
        });
    }

    const mapEvent = (e, map) => {
        // if (store.state.name) {
        //     warnMessage("请先绑定好要标记的名称");
        //     return false
        // } 
        if(store.state.type.other ==='household' && !store.state.name) {
            warnMessage('请先设置好该门牌下的户主')
            return false
        }
        if (store.state.point.hasOwnProperty("longitude")) {
            warnMessage("请拖动已有打点标记");
            return false
        } 
        if (store.state.objectId > 0) {
            let markerPoint = {};
            markerPoint.longitude = e.latlng.lng;
            markerPoint.latitude = e.latlng.lat;
            store.commit("changeMarker", markerPoint);
            let temp = L.marker([markerPoint.latitude, markerPoint.longitude], {
            draggable: true,
            }).addTo(map);

            temp.on('moveend', function(event) {
                moveMarker(event)
            })
        } else {
            warnMessage("请先选择左侧要标绘的数据");
        }
    };

    const updatePlotStatus = (type) => {
        const objectId = store.state.objectId
        let list = store.state.objectDataList
        list.forEach(item => {
            if(item.id === objectId) {
                if(type ==='save' && item.isPloted) {
                    item.isPloted = true
                } else {
                    item.isPloted = !item.isPloted
                }
            }
        })
        store.commit('setDataList',list)
    }
    return {
        init,
        removeAllMarkers,
        removeAllPolygons,
        removeHistoryMarkers,
        removePolygon,
        removeAllPlot,
        mapEvent,
        updatePlotStatus 
    }
}
