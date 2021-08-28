<template>
  <el-tree
    ref="treeRef"
    :data="state.treeData"
    :props="defaultProps"
    :default-expand-all="true"
    :check-strictly="true"
    :current-node-key="regionCode"
    @node-click="getNode"
    highlight-current
    :expand-on-click-node="false"
    node-key="id"
  >
  </el-tree>
</template>
<script setup>
import { onBeforeMount, ref, reactive } from 'vue'
import { getRegionTree } from '../services/common.js'
const props = defineProps({
  regionCode: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(["getEmitNode"])
const treeRef = ref(null);
const defaultProps = {
  label: "name",
  children: "children",
}
const state = reactive({
  treeData: [],
})
// 查询tree下第一个村
const searchFirst = (arr, key, value) => {
  // 循环所有键
  for (let v in arr) {
    let element = arr[v];
    // 1.判断是对象或者数组
    if (typeof element == "object") {
      let result = searchFirst(element, key, value);
      if (result) return result;
    } else {
      if (v == key) {
        if (element == value) return arr;
      }
    }
  }
};
// 获取tree数据
const getTreeData = async () => {
  await getRegionTree().then((res) => {
    if (res.code === 200) {
      state.treeData = [res.data];
      let defaultSelectNode = searchFirst(res.data.children, "level", 5)
      setTimeout(function () {
        treeRef.value.setCurrentKey(defaultSelectNode.id);
        emit('getEmitNode', {
          regionCode: defaultSelectNode.id,
          regionName: defaultSelectNode.name
        })
      }, 0);
    }
  });
};
// 点击tree
const getNode = (data, node) => {
  console.log("点击了tree", data);
  if (props.regionCode === data.id) {
    treeRef.value.setCurrentKey(data.id)
    return false
  }
  if (data.level == 5) {
    emit('getEmitNode', {
      regionCode: data.id,
      regionName: data.name
    })
    treeRef.value.setCurrentKey(data.id)
  } else {
    treeRef.value.setCurrentKey(props.regionCode)
  }
};

onBeforeMount(() => {
  getTreeData()
})
</script>
// <style lang="scss" scoped>
// :deep(.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content) {
//   background: rgb(64, 158, 255, 0.8);
//   color: #fff;
// }
// </style>