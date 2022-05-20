<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :small="total > 50 ? true : false"
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :hide-on-single-page="hideonsinglepage"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    hideonsinglepage: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: function () {
        return [10, 20, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'total,prev, pager, next'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const currentPage = computed({
      get() {
        return props.page
      },
      set(val) {
        emit('update:page', val)
      }
    })
    const pageSize = computed({
      get() {
        return props.limit
      },
      set(val) {
        emit('update:limit', val)
      }
    })
    const handleSizeChange = (val) => {
      emit('pageChange')
      // if (props.autoScroll) {
      //   scrollTo(0, 800);
      // }
    }
    const handleCurrentChange = (val) => {
      emit('pageChange')
      // if (props.autoScroll) {
      //   scrollTo(0, 800);
      // }
    }
    return {
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="scss" scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  text-align: right;
}
// .pagination-container.hidden {
//   display: none;
// }
</style>
