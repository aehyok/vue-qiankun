<template>
  <div>
    <template v-for="(item, index) in searchParameters" :key="index">
      <!-- 输入框 -->
      <el-input
        v-if="item.type == 'input'"
        :placeholder="item.placeholder"
        v-model="state.keyword"
        class="input-search"
        @keyup.enter="search"
      ></el-input>
      <!-- 选择器 -->
      <template v-if="item.type == 'select'">
        {{ item.title }}：
        <el-select
          v-model="item.defaultSelected"
          :clearable="item.showClear ? true : false"
          class="select-search"
          :placeholder="'请选择' + item.placeholder"
          @change="changeSelectClick"
          @clear="clearClick"
        >
          <el-option
            v-for="item in item.dictionary"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </template>
      <template v-if="item.type == 'dateSelect'">
        {{ item.title }}：
        <el-date-picker
          v-model="state.publishDate"
          type="daterange"
          @change="changeDate"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        >
          <!-- :default-value="[timeDefault, timeDefault]" -->
        </el-date-picker>
      </template>
      <template v-if="item.type == 'startDateSelect'">
        {{ item.title }}：
        <el-date-picker
          v-model="state.startDate"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          type="date"
          :placeholder="item.startDateSelect.placeholder"
          :disabled-date="disabledDate"
        >
        </el-date-picker>
        -
        <el-date-picker
          v-model="state.endDate"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          type="date"
          :placeholder="timeDefault"
          :disabled-date="disabledDate"
        >
        </el-date-picker>
      </template>
    </template>
    <el-button class="global-btn" plain type="primary" @click="search"
      >查询</el-button
    >
    <el-button class="global-btn" plain type="primary" @click="reset"
      >重置</el-button
    >
  </div>
</template>
<script setup>
import {
  computed,
  onMounted,
  reactive
} from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({
  searchParameters: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["search"]);
const state = reactive({
  keyword: "",
  getDefault: null,
  publishDate: [],
  startDate: "",
  endDate: "",
});
const timeDefault = computed(() => {
  let date = new Date();
  let defalutStartTime = date.getTime() - 7 * 24 * 3600 * 1000; // 转化为时间戳
  let defalutEndTime = date.getTime();
  let startDateNs = new Date(defalutStartTime);
  let endDateNs = new Date(defalutEndTime);
  // 月，日 不够10补0
  defalutStartTime =
    startDateNs.getFullYear() +
    "-" +
    (startDateNs.getMonth() + 1 >= 10
      ? startDateNs.getMonth() + 1
      : "0" + (startDateNs.getMonth() + 1)) +
    "-" +
    (startDateNs.getDate() >= 10
      ? startDateNs.getDate()
      : "0" + startDateNs.getDate());
  defalutEndTime =
    endDateNs.getFullYear() +
    "-" +
    (endDateNs.getMonth() + 1 >= 10
      ? endDateNs.getMonth() + 1
      : "0" + (endDateNs.getMonth() + 1)) +
    "-" +
    (endDateNs.getDate() >= 10
      ? endDateNs.getDate() - 1
      : "0" + String(endDateNs.getDate() - 1));
  return defalutEndTime;
});

const changeSelectClick = (item) => {
    console.log('item--item', item)
};
const clearClick = () => {};
const changeDate = () => {};

const search = () => {
  if (state.startDate && state.endDate) {
    let startDate = Number(state.startDate.replace("-", "").replace("-", ""));
    let endDate = Number(state.endDate.replace("-", "").replace("-", ""));
    if (startDate > endDate) {
      ElMessage.error("开始时间大于等于结束时间");
      return false;
    }
  }

  let option = props.searchParameters.find((res) => res.type == "select");
  if (!option) {
    option = {}; 
  }
  if (!state.publishDate) {
    state.publishDate = [];
  }
  console.log(state.publishDate, "state.publishDate");
  emit(
    "search",
    state.keyword,
    option.defaultSelected,
    state.publishDate,
    state.startDate,
    state.endDate
  );
};
const reset = () => {
  let option = props.searchParameters.find((res) => res.type == "select");
  if (!option) {
    option = {};
  }
  option.defaultSelected = state.getDefault;
  state.keyword = "";
  state.publishDate = [];
  state.startDate = "";
  state.endDate = "";
  
  emit(
    "search",
    state.keyword,
    state.getDefault,
    state.publishDate,
    state.startDate,
    state.endDate
  );
};
const disabledDate = (time) => {
  return time.getTime() > Date.now();
};
onMounted(() => {
  props.searchParameters.map((res) => {
    if (res.type == "select") {
      state.getDefault = res.defaultSelected;
    }
  });
});
</script>
<style scoped>
.input-search {
  width: 220px;
  margin-left: 12px;
}
.select-search {
  width: 220px;
  margin-right: 12px;
}
</style>