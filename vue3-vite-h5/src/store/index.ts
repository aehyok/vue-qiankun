import { defineStore } from 'pinia'

export const useStore = defineStore({
    id:"aehyok",
    state: ()=> {
        return {
            count: 0,
            title: 'hello aehyok'
        }
    }
})