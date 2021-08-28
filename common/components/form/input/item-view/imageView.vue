<template>
  <el-form-item
    :label="column.title + '：'"
    :prop="column.name"
    :rules="state.rules"
  >
    <!-- <div style="display: flex"></div> -->
    <template v-if="data.length">
      <div v-for="(item, index) in data" :key="index" class="borderItem">
        <img
          :src="item.thumbnailUrl ? item.thumbnailUrl : ''"
          alt=""
          class="img-class"
        />
        <i
          class="el-icon-circle-close imageClose"
          @click="removeImageClick"
        ></i>
      </div>
    </template>

    <upload-view
      accept=".jpg,.jpeg,.png"
      @callback="column.callBackFunction"
      :sizeLimit="1024 * 10"
      :limit="column.limit"
      fileType="img"
      v-if="data.length === 0 || column.limit - data.length > 0"
    />
    <div v-if="column.remark">
      {{ column.remark }}
    </div>
  </el-form-item>
</template>

<script setup>
import UploadView from './uploadView'
import { reactive } from 'vue'
const emit = defineEmits(["update:data"])
const props = defineProps({
  column: {
    type: [Object],
    default: () => { },
  },
  data: {
    type: Array,
    default: function () {
      return []
    }
  },
})

const { column } = props
console.log(column, '--------------image---------------')
const state = reactive({
  headers: {},
  upLoadUrl: '',
  rules: []
})

state.rules = [
  {
    required: column.required,
    message: `请输入${column.title}`,
    trigger: ['blur', 'change'],
  }
]

if (column && column.rules) {
  console.log(rules, column.rules, 'column.rules-----------')

  state.rules = [...state.rules, ...column.rules]
}

const removeImageClick = (index) => {
  let list = props.data
  list.splice(index, 1)
  emit('update:data', list)
}

</script>

<style lang="scss" scoped>
.borderItem {
  position: relative;
  width: 150px;
  height: 150px;
  .imageClose {
    position: absolute;
    right: 0;
    font-size: 26px;
    color: #999;
  }
  .img-class {
    width: 100%;
    height: 100%;
  }
}
</style>
