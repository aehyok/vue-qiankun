import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

export function useMap() {
    let map = {}
    const init = (centerPoint) => {
        console.log('进入hooks useMap')
        return initMap(centerPoint)
    }

    // TODO 初始化Map地图
    const initMap = (centerPoint) =>{
        initMarkerIcon()
        map = L.map("map", {
            zoom: 13,
            minZoom: 10,
            maxZoom: 22,
            center: centerPoint,   //必须初始化center中心坐标
            doubleClickZoom: false, // 禁用双击放大
            zoomControl: false, // 不显示默认的放大缩小按钮，可通过control.zoom进行控制
            attributionControl: false,
        });
        initControl()

        initTileLayer()

        initGeoman()
        return map
    }

    const initMarkerIcon = () => {
        // TODO 设置marker标记的默认图片
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
    }

    // TODO 初始化图层
    const initTileLayer = () => {
        const satellite = L.tileLayer(
            "https://mt{s}.sea.utuapp.cn/610403/satellite/{z}/{x}/{y}.png",
            {
                subdomains: ["1", "2", "3", "4"],
            }
        );
        const overlay = L.tileLayer(
            "https://mt{s}.sea.utuapp.cn/610403/overlay/{z}/{x}/{y}.png",
            {
                subdomains: ["1", "2", "3", "4"],
            }
        );
        // 村的正射影像
        const village = L.tileLayer(
            "https://mt{s}.sea.utuapp.cn/610403/models/610403102210/{z}/{x}/{y}.png",
            {
                subdomains: ["1", "2", "3", "4"],
                minZoom: 10,
                maxZoom: 22, // 默认最大值位18，19后就看不到此图层
            }
        );
        // TODO 图层分组
        const layerGroup = L.layerGroup([satellite, overlay, village]);
        layerGroup.addTo(map);
    }

    // TODO 放大 缩小 按钮控制
    const initControl = () => {
        L.control
        .zoom({
        position: "bottomleft",
        })
        .addTo(map);
    }

    // TODO 编辑图层的基础设置
    const initGeoman = () => {
        // TODO 设置翻译语言
        map.pm.setLang("zh");

        // 设置绘制后的线条颜色等
        map.pm.setPathOptions({
            color: "orange",
            fillColor: "green",
            fillOpacity: 0.3,
        });
    }
    return {
        init,
    }
}