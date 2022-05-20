<template>
  <div class="tree-select-div">
    <el-select v-model="selected" class="select-class" ref="selectRef">
      <el-option style="height: 100%; padding: 0" :value="currentSelectTreeNode">
        <el-tree
          ref="treeRef"
          :data="treeData"
          :props="defaultProps"
          :default-expand-all="true"
          :check-strictly="true"
          @node-click="getNode"
          highlight-current
          :expand-on-click-node="false"
          node-key="id"
        >
        </el-tree>
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { getRegionTree } from '../services/common.js'
import { defineComponent, toRefs, reactive, ref, onBeforeMount } from 'vue'
export default defineComponent({
  components: {},
  props: {},
  setup(props, { emit }) {
    const state = reactive({
      selected: '',
      treeData: [],
      currentSelectTreeNode: {},
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    })
    const selectRef = ref(null)
    // 获取tree数据
    const getTreeData = () => {
      getRegionTree().then((res) => {
        if (res.code === 200) {
          state.treeData = [res.data]
          state.selected = res.data.name
          emit('selectTree', res.data.id)
        }
      })
    }
    onBeforeMount(() => {
      getTreeData()
    })

    // 点击tree
    const getNode = (data, node) => {
      state.currentSelectTreeNode = data
      state.selected = data.name
      selectRef.value.blur()
      emit('selectTree', data.id)
    }
    return {
      ...toRefs(state),
      getNode,
      selectRef
    }
  }
})
</script>
<style lang="scss" scoped>
.select-class {
  width: 100%;
}
</style>
