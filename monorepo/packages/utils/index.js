import { reactive, effect } from 'vue'

export const test = () => {
    const state = reactive({
        form: {},
        column: []
    })
}
export const add = (a, b) => a + b
