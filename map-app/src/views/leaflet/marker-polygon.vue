<template>
  <div id="map" style="width: 1000px; height: 1200px">
    <div class="operation">
      <!--click.stop阻止事件继续传递执行-->
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        @click.stop="mark"
        >绘制标记</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        @click.stop="plot"
        >绘制多边形</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        @click.stop="drag"
        >拖动多边形</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        @click.stop="edit"
        >编辑多边形</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        @click.stop="edit"
        >绘制多边形</el-button
      >
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "../../../public/L.KML.js";
export default defineComponent({
  setup() {
    let map = {};
    const state = reactive({
      markerPoint: {}, // Marker标记
      plotPolygon: [], // Polygon多边形
    });

    const mark = () => {
      map.pm.enableDraw("Marker", {});
    };
    const plot = () => {
      console.log("open");
      map.pm.enableDraw("Polygon", {
        pinning: true,
        snappable: true, // 可吸附于附近的某一个点
        measurements: { measurement: true },
      });
    };

    const edit = () => {
      map.pm.enable({
        allowSelfIntersection: false,
      });
    };
    const drag = () => {
      console.log("drag");
      map.pm.enableGlobalDragMode();
    };

    const beforeUpload = (file) => {
      console.log(file, "beforeUpload----上传文件");
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = () => {
        console.log(fileReader.result, "fileReader.result");
        const parser = new DOMParser();
        const kml = parser.parseFromString(fileReader.result, "text/xml");
        const track = new L.KML(kml);
        console.log(track, "track");
        map.addLayer(track);

        // Adjust map to show the kml
        const bounds = track.getBounds();
        map.fitBounds(bounds);
      };
    };

    const onSuccess = (response, file, fileList) => {
      console.log("success----on", response, file);
    };

    onMounted(() => {
      delete Icon.Default.prototype._getIconUrl;
      Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      });

      let array = [34.263742732916505, 108.01650524139406];

      // TODO 初始化Map地图
      map = L.map("map", {
        zoom: 13,
        minZoom: 10,
        maxZoom: 22,
        center: [array[0], array[1]],
        doubleClickZoom: false, // 禁用双击放大
        zoomControl: false, // 不显示默认的放大缩小按钮，可通过control.zoom进行控制
        attributionControl: false,
      });

      // TODO 放大 缩小 按钮控制
      L.control
        .zoom({
          position: "bottomleft",
        })
        .addTo(map);

      // map.on('click', function(ev) {
      //     console.log(ev, 'map--click')
      // });

      map.pm.setLang("zh");

      // 设置绘制后的线条颜色等
      map.pm.setPathOptions({
        color: "orange",
        fillColor: "green",
        fillOpacity: 0.3,
      });

      // 图层创建成功结束时调用的方法（目前针对Marker和Polygon多边形）
      map.on("pm:create", (e) => {
        // Polygon 多边形
        if (e.shape === "Polygon") {
          console.log("绘制多边形", e);
        }

        // Marker标记
        if (e.shape === "Marker") {
          // 只保留最后一次点击的Marker
          map.eachLayer(function (layer) {
            console.log(layer._url, layer._leaflet_id, layer.pm);
            if (
              layer.pm &&
              layer.pm._shape === "Marker" &&
              e.marker._leaflet_id !== layer._leaflet_id
            ) {
              layer.remove();
            }
          });
        }

        e.layer.on("click", function () {
          console.log("创建了图层后的click事件");
        });

        e.layer.on("pm:edit", (event) => {
          // 修改坐标
          console.log(event, "pm:edit拖动");
        });
      });

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
      // 图层分组
      const layerGroup = L.layerGroup([satellite, overlay, village]);
      layerGroup.addTo(map);
    });
    return {
      plot,
      drag,
      mark,
      edit,
      beforeUpload,
      onSuccess,
    };
  },
});
</script>
  <style lang="scss" scoped>
.operation {
  position: absolute;
  z-index: 10000;
  top: 20px;
  right: 10px;
  padding: 2px;
  // width: 120px;
  height: 30px;
}
</style>