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
import { useMap } from "./useMap";
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import "../../../public/L.KML.js";
export default defineComponent({
  setup() {
    let map = {};
    const state = reactive({
      markerPoint: {}, // Marker标记
      plotPolygon: [], // Polygon多边形
    });

    // const { init } = useMap();
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
      const { init } = useMap();
      map = init([34.263742732916505, 108.01650524139406]);

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