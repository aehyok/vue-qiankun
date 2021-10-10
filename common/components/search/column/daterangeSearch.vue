<template>
    {{ column.title }}：
    <el-date-picker
        v-model="startValue"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        type="date"
        :placeholder="column.startDateSelect.placeholder"
        :disabled-date="disabledDate"
    >
    </el-date-picker>
    -
    <el-date-picker
        v-model="endValue"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        type="date"
        :placeholder="timeDefault"
        :disabled-date="disabledDate"
    >
    </el-date-picker>
</template>
<script setup>
import { computed } from 'vue'
const emit = defineEmits(["update:data"])

const props = defineProps({
  column: {
    type: [Object],
    default: () => {}
  },
  data: {
    type: String,
    default: ""
  }
})

const value = computed({
  get: function () {
    return props.data
  },
  set: function (val) {
    emit('update:data', val)
  }
})

const disabledDate = (time) => {
  return time.getTime() > Date.now();
};

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

const clearClick = () => {};
</script>
