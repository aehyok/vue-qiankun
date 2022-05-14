<template>
  <div class="menu-container">
    <el-scrollbar
      class="scroll-wrap"
      :noresize="false"
      view-style="{ height: '100%' }"
    >
      <el-menu
        :default-active="activeMenu"
        :unique-opened="true"
        router
        background-color="#0F2144"
        text-color="#FFFFFF"
        active-text-color="#F7B500"
        @select="handleSelect"
      >
        <template v-for="item in displayMenuTree">
          <el-sub-menu
            :index="item.path"
            :key="item.id"
            v-if="item.children?.length"
          >
            <template #title>
              <!-- <i class="el-icon-location"></i> -->
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              style="border: 0; float: left; width: 100%"
              :index="child.path"
              :key="child.id"
              v-for="child in item.children"
            >
              {{ child.title }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item :index="item.path" v-else>
            <!-- <i class="el-icon-menu"></i> -->
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
    <div class="version">V{{ version }}</div>
  </div>
</template>
<script lang="ts">
import {
  reactive,
  computed,
  onMounted,
  defineComponent,
  toRefs,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Menu } from "../../types/models";

interface DataProp {
  displayMenuTree?: Menu[];
  version: string;
  openeds?: string[];
}
export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();

    const state: DataProp = reactive({
      version: "",
    });
    // TODO watch store
    watch(
      () => store.state.systemId,
      (newValue, oldValue) => {
        state.displayMenuTree = store.state.menuList.find(
          (item) => item.Key === newValue
        )?.MenuList;
      },
      {
        immediate: true,
        deep: true,
      }
    );
    const activeMenu = computed(() => {
      return route.path;
    });

    const handleSelect = (_key, _keyPath) => {
      //
    };

    const getVersion = () => {
      const res = {
        code: 200,
        message: "success",
        data: { code: "0.1.012", updateDate: "2021.76.18", description: "" },
      };
      state.version = res.data.code;
    };
    onMounted(() => {
      getVersion();
    });
    return {
      ...toRefs(state),
      activeMenu,
      handleSelect,
    };
  },
});
</script>
<style lang="scss" scoped>
.scroll-wrap {
  overflow: hidden;
  height: 100%;
  :deep(.el-scrollbar__view) {
    position: relative;
  }
}
.menu-container {
  position: relative;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  background: #0f2144;
  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }
}
.version {
  color: #fff;
  width: 100%;
  text-align: center;
  color: #bcbcbc;
  flex: 0;
  line-height: 30px;
}
:deep(.el-submenu__title i) {
  color: #ffffff;
}

// :deep(.el-submenu__title) {
//   font-size: 18px;
// }
// :deep(.el-menu-item) {
//   font-size:18px;
// }
</style>
