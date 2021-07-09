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
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import {
  directive,
  Contextmenu,
  ContextmenuItem,
  ContextmenuDivider,
  ContextmenuSubmenu,
  ContextmenuGroup,
} from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
import {
  warnMessage,
  successMessage,
} from "../../../../main-vite-app-ts/src/utils/message";
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
      plotPolygon: [], // Polygon多边形
    });

    const plot = () => {
      console.log("open");
      if (state.plotPolygon.length > 0) {
        warnMessage("已标绘，请进行编辑");
      } else {
        map.pm.disableGlobalEditMode();
        map.pm.enableDraw("Polygon", {
          pinning: true,
          snappable: true, // 可吸附于附近的某一个点
          measurements: { measurement: true },
        });
      }
    };

    // 设置可编辑
    const edit = () => {
      if (state.plotPolygon.length === 0) {
        warnMessage("请先进行标绘");
        return false;
      }
      map.pm.enableGlobalEditMode();
    };

    // 设置可拖拽
    const drag = () => {
      if (state.plotPolygon.length === 0) {
        warnMessage("请先进行标绘");
        return false;
      }
      map.pm.disableGlobalEditMode();
      map.pm.enableGlobalDragMode();
    };

    function deletePolygon(e) {
      console.log("deletePolygon");
      if (state.plotPolygon.length === 0) {
        warnMessage("请先进行标绘");
      } else {
        removePolygon(map);
        successMessage("标绘移除成功");
        state.plotPolygon = [];
      }
    }

    function savePolygon(e) {
      console.log("savePolygon");
      if (state.plotPolygon.length === 0) {
        warnMessage("请先进行标绘");
      }
    }

    const { init, removePolygon } = useMap();
    onMounted(() => {
      map = init([34.263742732916505, 108.01650524139406]);

      // 图层创建成功结束时调用的方法（目前针对Marker和Polygon多边形）
      map.on("pm:create", (e) => {
        // Polygon 多边形
        if (e.shape === "Polygon") {
          state.plotPolygon = e.layer._latlngs;
          console.log("绘制多边形", e);
        }

        e.layer.on("click", function () {
          console.log("创建了图层后的click事件");
        });

        // 编辑修改后的坐标
        e.layer.on("pm:edit", (event) => {
          state.plotPolygon = event.layer._latlngs;
          console.log(event, "pm:edit拖动");
        });
      });
    });
    return {
      ...toRefs(state),
      plot,
      drag,
      edit,
      savePolygon,
      deletePolygon,
      refMap,
      contextmenu,
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
.image-size {
  width: 18px;
  height: 18px;
}
</style>
