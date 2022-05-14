<template>
    <component :is="column.type + 'Config'" :column="column" />
</template>

<script>
import checkboxConfig from './column/config/checkboxConfig.vue'
import cityselectConfig from './column/config/cityselectConfig.vue'
import daterangeConfig from './column/config/daterangeConfig.vue'
import dateConfig from './column/config/dateConfig.vue'
import editorConfig from './column/config/editorConfig.vue'
import imageConfig from './column/config/imageConfig.vue'
import numberConfig from './column/config/numberConfig.vue'
import radioConfig from './column/config/radioConfig.vue'
import selectConfig from './column/config/selectConfig.vue'
import staticConfig from './column/config/staticConfig.vue'
import textareaConfig from './column/config/textareaConfig.vue'
import textConfig from './column/config/textConfig.vue'
import videoConfig from './column/config/videoConfig.vue'
import { defineComponent, watch } from 'vue'
export default defineComponent({
    props: {
        column: {
            type: Object,
            default: () => { },
        }
    },
    components: {
        checkboxConfig,
        cityselectConfig,
        daterangeConfig,
        dateConfig,
        editorConfig,
        imageConfig,
        numberConfig,
        radioConfig,
        selectConfig,
        textConfig,
        textareaConfig,
        staticConfig,
        videoConfig
    },
    setup(props) {
        watch(
            () => props.column,
            (newValue, oldValue) => {
                console.log(props.column, "props.column")
            },
            {
                // immediate: true,
                deep: true
            }
        );
    }
})
</script>