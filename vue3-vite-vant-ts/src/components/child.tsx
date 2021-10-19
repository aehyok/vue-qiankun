import { ElButton } from 'element-plus'
import { RenderComponent } from './renderComponent'
import { defineComponent, PropType, ref } from 'vue'

export const validatorComponentSize = (value: string): boolean =>
  ['', 'large', 'medium', 'small', 'mini'].includes(value)

export default defineComponent({
  props: {
    type: {
      type: String as PropType<
        'primary' | 'text' | 'success' | 'warning' | 'danger' | 'info' | 'default'
      >,
      default: 'default'
    },
    size: {
      type: String as PropType<'large' | 'medium' | 'small' | 'mini'>,
      default: 'medium',
      validator: (val: string) => validatorComponentSize(val)
    },
    onChangePswVisible: Function as PropType<(flag: boolean) => void>
  },
  emits: ['changePswVisible'],
  setup(props, { emit, slots }) {
    const flag = ref<boolean>(false)
    const title = ref<string>('xixi')

    setTimeout(() => {
      title.value = 'haha'
    }, 2000)

    return () => (
      <div class="child">
        <ElButton
          type={props.type}
          size={props.size}
          {...{
            onClick: () => {
              flag.value = !flag.value
              emit('changePswVisible', flag.value)
            }
          }}
        >
          {flag.value ? '隐藏密码' : '显示密码'}
        </ElButton>
        <br />
        {slots.default && slots.default()}
        <br />
        {slots.suffix && slots.suffix('作用域插槽示例')}
        prefix具名插槽内容 : {slots.prefix && slots.prefix()}
        <br />
        <RenderComponent
          title={title.value}
          v-slots={{
            prefix: <i class="el-icon-medal-1"></i>
          }}
        >
          这是render形式的组件示例
        </RenderComponent>
      </div>
    )
  }
})
