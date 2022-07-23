<template>
  <div id="cesiumContainer" style="width: 800px; height: 800px"></div>
</template>
<script>
import { defineComponent, onMounted } from 'vue'
// import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium'
export default defineComponent({
  setup() {
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNzliZGRiNC1mN2U5LTQ0OWItYTUwZi0wYmUxZjk5MGEwOGYiLCJpZCI6NTYyMDMsImlhdCI6MTYyMTMyNTM0NX0.gVy_fonVErGarDg5E-rW6YcY-dJlWVauaE7Wg5ZhDh8'
    onMounted(() => {
      // Cesium.Ion.defaultAccessToken = token;
      // var viewer = new Cesium.Viewer("cesiumContainer", {
      //   geocoder: false,
      //   homeButton: false,
      //   sceneModePicker: false, //是否显示投影方式控件
      //   baseLayerPicker: true, //是否显示图层选择控件
      //   navigationHelpButton: false, //是否显示帮助信息控件
      //   geocoder: false, //是否显示地名查找控件
      //   animation: false, //是否显示动画控件
      //   timeline: false, //是否显示时间线控件
      //   fullscreenButton: false,
      //   vrButton: false,
      //   shadows: true, //影子
      //   infoBox: false, //是否显示点击要素之后显示的信息
      // });
    })
  }
})
</script>
