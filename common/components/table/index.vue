<!--分页table-->
<template>
  <!-- :header-cell-style="handleTheadStyle" -->
  <el-table
    v-loading.iTable="options.loading"
    :data="list"
    :highlight-current-row="options.highlightCurrentRow"
    :height="height"
    ref="mutipleTable"
    :stripe="options.stripe"
    :border="border"
    :default-sort="defaultSort"
    :header-cell-style="{ background: '#EEF4FF' }"
    @selection-change="handleSelectionChange"
    @current-change="handleCurrentChange"
    @sort-change="sortChange"
  >
    <!--region 选择框-->
    <el-table-column
      v-if="isCheckBox"
      type="selection"
      align="center"
      style="width: 65px"
    >
    </el-table-column>
    <!---seq 序列号--->
    <el-table-column
      v-if="isIndex"
      label="序号"
      type="index"
      align="center"
      width="65px"
    >
    </el-table-column>
    <!--endregion-->
    <!--region 数据列-->
    <template v-for="(column, index) in normalColumns" :key="column.label">
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :align="column.align"
        :width="column.width"
        :sortable="column.sortable"
        :sort-orders="['descending', 'ascending', null]"
      >
        <template #default="scope">
          <!-- html可自定义字段的显示html -->
          <template v-if="column.type==='html'">
            <div v-html="convertHtml(scope.row, column)"></div>
          </template>

          <!--字典转换--->
          <template v-else-if="column.dictionary">
            <span>
              {{
                column.dictionary.find(
                  (item) => item.code === scope.row[column.prop]
                ).name
              }}
            </span>
          </template>
          <!--日期格式-->
          <template v-else-if="column.dateFormat">
            <span>
              {{ convertDate(scope.row[column.prop], column.dateFormat) }}
            </span>
          </template>
          <!--图片url-->
          <template v-else-if="column.image">
            <img
              :src="scope.row[column.image][0].url"
              alt=""
              v-if="scope.row[column.image].length"
              class="table-img"
            />
            <span v-else>--</span>
          </template>
          <template v-else>
            <span>{{ scope.row[column.prop] }}</span>
          </template>
        </template>
      </el-table-column>
    </template>
    <!--endregion-->
    <!--region 按钮操作组-->
    <el-table-column
      label="操作"
      align="center"
      :width="operates.width"
      :fixed="operates.fixed"
      v-if="
        Object.keys(operates).length &&
        operates.list.filter((_x) => _x.show).length
      "
    >
      <!-- v-permission="btn.permission" -->
      <template #default="scope">
        <div class="operate-group">
          <template v-for="(btn, key) in operates.list">
            <div class="item" v-if="btn.show" :key="btn.id">
              <el-button
                :type="btn.type"
                size="mini"
                :icon="btn.icon"
                :disabled="btn.disabled"
                :plain="btn.plain"
                @click.native.prevent="btn.method(key, scope.row, scope.$index)"
              >
                {{ btn.label }}
              </el-button>
            </div>
          </template>
        </div>
      </template>
    </el-table-column>
    <!--endregion-->
  </el-table>
  <page-setting
    v-model:page="pageModel.page"
    v-model:limit="pageModel.limit"
    v-model:total="pageModel.total"
    @pageChange="pageChange"
  />
</template>
<!--endregion-->
<script setup>
import { computed, ref, watch } from "vue";
import { format } from 'date-fns'
import PageSetting from './page-setting.vue'
const props = defineProps({
  pageModel: {
    type: Object,
    default: () => { }
  },
  height: {
    type: String,
    default: () => {

    }
  },
  defaultSort: {
    type: Object,
    default: () => {

    }
  },
  // 数据列表
  list: {
    type: Array,
    default: () => []
  },
  /*
    需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
  */
  columns: {
    type: Array,
    default: () => []
  },
  border: {
    type: Boolean,
    default: true,
  },
  /*
    操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
   */
  operates: {},
  options: {
    type: Object,
    default: () => {
      return {
        stripe: false, // 是否为斑马纹 table
        highlightCurrentRow: true // 是否要高亮当前行
      }
    }
  } // table 表格的控制参数
})
console.log(props, '--------111-----------')
const sortable = "custom"
const ordersList = []
const activeThead = {}
const emit = defineEmits(["search", "handleCurrentChange", "handleSelectionChange"])
const normalColumns = ref([]);

// 多行选中
const handleSelectionChange = val => {
  emit("handleSelectionChange", val);
};

const convertDate = (data, dateFormat) => {
  console.log(data, 'row-------------')
  return data ? format(new Date(data), dateFormat) : ""
}

const handleCurrentChange = val => {
  console.log(val, 'handleCurrentChange')
  emit("handleCurrentChange", val)
}
// 显示 表格操作弹窗
const showActionTableDialog = () => {
  emit("handelAction");
};

// 将定义的字符串函数 通过eval进行解析执行
const convertHtml = (row, column) => {
  console.log(column.html,'html')
  const evalFunction = eval(column.html)
  return evalFunction(row, column)
}

watch(() => props.columns, (newValue, oldValue) => {
    normalColumns.value = props.columns.filter(item => (!item.type || !["checkbox", "index"].includes(item.type)))
    console.log(props.columns, normalColumns.value, '--------normalColumns-----------')
  },
    {
      immediate: true,
      deep: true
    })
// 判断是否展示多选框
const isCheckBox = computed(() => {
  console.log(props.columns.some(item => item.type === 'index'), '是否显示check')
  return props.columns.some(item => item.type === 'checkbox')
})

// 判断是否展示多选框
const isIndex = computed(() => {
  console.log(props.columns.some(item => item.type === 'index'), '是否显示index')
  return props.columns.some(item => item.type === 'index')
})

const sortOrder = {
  "ascending": "asc",
  "descending": "desc",
}

const sortChange = (column, prop, order) => {
  if (sortable === 'custom') {
    console.log(column, prop, order, '------sortChange--------')
    let orderby = ""
    if (column) {
      orderby = {
        fieldName: column.prop,
        sort: sortOrder[column.order]
      }
    } else {
      orderby = ""
    }
    // 去调用接口传递orderby参数即可
  }
}

const pageChange = () => {
  emit('search')
}
</script>
<style lang="scss" scoped>
.item {
  display: inline;
  padding-right: 4px;
}

.table-img {
  width: 40px;
  height: 40px;
  border-radius: 3px;
}
</style>
