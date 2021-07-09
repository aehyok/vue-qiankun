<template>
  <div id="map" style="width: 1000px; height: 1200px"></div>
</template>
  <script>
import { useMap } from "./useMap";
import { defineComponent, onMounted, reactive } from "vue";
export default defineComponent({
  setup() {
    let map = {};
    const state = reactive({
      markerPoint: {
        longitude: 0,
        latitude: 0,
      }, // Marker标记
      plotPolygon: [], // Polygon多边形
    });

    function deleteMarker(e) {
      console.log("deleteMarker");
      removeAllMarkers(map);
    }

    function saveMarker(e) {
      console.log("saveMarker");
    }
    const { init, removeAllMarkers } = useMap();
    onMounted(() => {
      let contextmenuItems = [
        {
          text: "保存",
          icon: "../logo.png",
          callback: saveMarker,
        },
        {
          text: "删除",
          icon: "../logo.png",
          callback: deleteMarker,
        },
      ];
      map = init([34.263742732916505, 108.01650524139406], contextmenuItems);

      map.on("click", function (e) {
        state.markerPoint.longitude = e.latlng.lng;
        state.markerPoint.latitude = e.latlng.lat;
        removeAllMarkers(map);
        let marker = L.marker(
          [state.markerPoint.latitude, state.markerPoint.longitude],
          {
            draggable: true,
          }
        ).addTo(map);
        // {
        //     draggable: true,
        //     contextmenu: true,
        //     contextmenuWidth: 70,
        //     contextmenuItems: [
        //       {
        //         text: "保存",
        //         icon: "../logo.png",
        //         callback: saveMarker,
        //       },
        //       {
        //         text: "删除",
        //         icon: "../logo.png",
        //         callback: deleteMarker,
        //       },
        //     ],
        //   }

        marker.on("contextmenu", function (event) {
          console.log(event, "111111111");
        });
      });
    });
    return {};
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