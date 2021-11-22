<template>
    <component
      :is="column.type + 'Config'"
      :column="column"
    />
</template>

<script>
    import textConfig from './column/config/textConfig.vue'
    import textareaConfig from './column/config/textareaConfig.vue'
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
                    // immediate: true,
                    deep: true
                }
            ); 
        }
    })
</script>