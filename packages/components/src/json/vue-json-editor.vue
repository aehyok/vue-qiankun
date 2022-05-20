<template lang="html">
  <div class="jsoneditor-container" :class="{ 'max-box': max, 'min-box': !max }" :style="getHeight">
    <div ref="jsoneditor" class="jsoneditor-box"></div>
    <button
      type="button"
      @click="max = !max"
      class="max-btn"
      size="small"
      v-if="options.mode == 'code' && plus"
    ></button>
  </div>
</template>

<script setup>
import JSONEditor from 'jsoneditor/dist/jsoneditor.min.js'
import 'jsoneditor/dist/jsoneditor.min.css'
import { onMounted, onUnmounted, watch, reactive, nextTick, computed, ref } from 'vue'

const props = defineProps({
  value: [Object, Array, Number, String, Boolean],
  height: {
    type: String
  },
  plus: {
    type: Boolean,
    default: true
  }
})

const options = {
  mode: 'code',
  mainMenuBar: false
}

const emit = defineEmits(['update:value', 'error', 'changeModel'])

const jsoneditor = ref(null)
const max = ref(false)
const state = reactive({
  editor: null,
  style: {},
  internalChange: false
})
onMounted(() => {
  console.log(jsoneditor.value, 'jsoneditor.value')
  initView()
})
onUnmounted(() => {
  destroyView()
})

const onChange = () => {
  let error = null
  let json = {}
  try {
    json = state.editor.get()
  } catch (err) {
    error = err
  }
  if (error) {
    emit('error', error)
  } else {
    if (state.editor) {
      state.internalChange = true
      console.log(json, 'json---------value---')
      emit('update:value', json)
      // emit('changeModel', json)
      nextTick(() => {
        state.internalChange = false
      })
    }
  }
}
const initView = () => {
  if (!state.editor) {
    const container = jsoneditor.value
    const _options = Object.assign(options, {
      onChange: onChange
    })
    state.editor = new JSONEditor(container, _options)
  }
  console.log(props.value, 'value')
  state.editor.set(props.value || {})
}
const destroyView = () => {
  if (state.editor) {
    state.editor.destroy()
    state.editor = null
  }
}
watch(
  () => props.value,
  (newValue, oldValue) => {
    if (state.editor && newValue && !state.internalChange) {
      state.editor.set(newValue)
    }
  },
  {
    immediate: true,
    deep: true
  }
)
watch(
  () => state.max,
  (newValue, oldValue) => {
    nextTick(() => {
      initView()
    })
  },
  {
    immediate: true
  }
)

const getHeight = computed(() => {
  if (props.height && !state.max) {
    return {
      height: props.height
    }
  }
})
</script>

<style lang="scss" scoped>
.jsoneditor-container.max-box {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
}

.jsoneditor-container.min-box {
  position: relative;
  min-width: 300px;
  width: 100%;
}

.jsoneditor-box {
  height: 100%;
}

.jsoneditor-container:hover .max-btn {
  display: block;
}

.max-btn {
  display: none;
  position: absolute;
  top: 7px;
  right: 110px;
  color: #fff;
  width: 24px;
  height: 24px;
  // background: rgba(0, 0, 0, 0) url(../../assets/plus.svg) no-repeat;
  background-position: 3px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 3px;
}
.max-btn:hover {
  border: 1px solid #d7e6fe;
}
</style>
