<template>
  <div
    id="map"
    ref="refMap"
    style="width: 1000px; height: 800px"
    v-contextmenu:contextmenu
  >
    <div class="operation">
      <!--click.stop阻止事件继续传递执行-->
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        @click.stop="markClick"
        >绘制标记</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        @click.stop="plotClick"
        >绘制多边形</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        @click.stop="dragClick"
        >拖动多边形</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        @click.stop="editClick"
        >编辑多边形</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        @click.stop="importClick"
        >导入行政边界（KML文件）</el-button
      >
    </div>
  </div>
  <v-contextmenu ref="contextmenu">
    <v-contextmenu-group title="">
      <v-contextmenu-item @click="savePolygon">
        <img :src="url" class="image-size" />
      </v-contextmenu-item>
      <v-contextmenu-item @click="deletePolygon">
        <img :src="url" class="image-size" />
      </v-contextmenu-item>
    </v-contextmenu-group>
  </v-contextmenu>
</template>
<script>
import { useMap } from "./useMap";
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from "vue";
import "../../../public/L.KML.js";
import {
  directive,
  Contextmenu,
  ContextmenuItem,
  ContextmenuDivider,
  ContextmenuSubmenu,
  ContextmenuGroup,
} from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
export default defineComponent({
  directives: {
    contextmenu: directive,
  },
  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    [ContextmenuDivider.name]: ContextmenuDivider,
    [ContextmenuSubmenu.name]: ContextmenuSubmenu,
    [ContextmenuGroup.name]: ContextmenuGroup,
  },
  setup() {
    const contextmenu = ref(null);
    const refMap = ref(null);
    let map = {};
    const state = reactive({
      url: "../logo.png",
      markerPoint: {}, // Marker标记
      plotPolygon: [], // Polygon多边形
    });

    // const { init } = useMap();
    const markClick = () => {
      map.pm.enableDraw("Marker", {
        continueDrawing: false, // 设置后  marker标记完一个后，右键不会移除
      });
    };
    const plotClick = () => {
      console.log("open");
      map.pm.enableDraw("Polygon", {
        pinning: true,
        // finishOn: "click",
        snappable: true, // 可吸附于附近的某一个点
        measurements: { measurement: true },
      });
    };

    const editClick = () => {
      map.pm.enableGlobalEditMode({
        allowSelfIntersection: false,
      });
    };

    const dragClick = () => {
      console.log("drag");
      map.pm.enableGlobalDragMode();
    };

    const importClick = () => {
      console.log("导入kml");
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
          // map.pm.disableDraw();
          // map.pm.disableGlobalEditMode();
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
      ...toRefs(state),
      refMap,
      contextmenu,
      plotClick,
      dragClick,
      markClick,
      editClick,
      importClick,
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
  left: 10px;
  padding: 2px;
  // width: 120px;
  height: 30px;
}

.image-size {
  width: 18px;
  height: 18px;
}
</style>
