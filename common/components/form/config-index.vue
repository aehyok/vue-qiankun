<template>
    <component
      :is="column.type + 'Config'"
      :column="column"
    />
</template>

<script setup>
    import textConfig from './input/config/textConfig.vue'
    import textareaConfig from './input/config/textareaConfig.vue'
    import { watch } from 'vue'
    const props = defineProps({
        column:{
            type: Object,
            default: () => { },
        }
    })

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
</script>