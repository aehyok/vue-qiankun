import { ref, renderSlot, onUnmounted, defineComponent } from 'vue'

// 带render函数的组件 优点：可将逻辑区与模版区分开
export const RenderComponent = defineComponent({
  props: {
    title: String
  },
  setup() {
    const count = ref<number>(1)

    const timer = setInterval(() => {
      count.value++
    }, 2000)

    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      count
    }
  },
  render() {
    // render函数在响应式数据发生更改时会自动触发（与react类似）
    const { count, $slots, title } = this
    return (
      <div class="render-component">
        {renderSlot($slots, 'prefix')} {count}
        <br />
        这是props：{title}
        <br />
        {renderSlot($slots, 'default')}
      </div>
    )
  }
})
