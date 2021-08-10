<template>
  <div style="width: 1000px; height: 800px; border: 1px solid blue">
    <draggable
      v-model="myArray"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element }">
        <div
          style="
            width: 400px;
            height: 300;
            border: 1px dashed red;
            padding: 10px;
            margin: 10px;
          "
        >
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { reactive, toRefs } from "vue";
export default {
  components: {
    draggable
  },
  setup() {
    const state = reactive({
      myArray: [
        {
          id: 1,
          name: "1"
        },
        {
          id: 2,
          name: "2"
        },
        {
          id: 3,
          name: "3"
        }
      ]
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>