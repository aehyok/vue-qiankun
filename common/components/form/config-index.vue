<template>
{{column.type}}
    <component
      :is="column.type + 'Config'"
      :column="column"
    />
</template>

<script>
    import textConfig from './input/config/textConfig.vue'
    import textareaConfig from './input/config/textareaConfig.vue'
    import { defineComponent, watch } from 'vue'
    export default defineComponent({
        props:{
            column:{
                type: Object,
                default: () => { },
            }
        },
        components: {
           textConfig,
            textareaConfig,
        },
        setup(props) {
            watch(
                () => props.column,
                (newValue, oldValue) => {
                    console.log(props.column,"props.column")
                },
                {
                    immediate: true,
                    deep: true
                }
            ); 
        }
    })
</script>