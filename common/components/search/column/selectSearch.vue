<template>
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