import { defineStore } from 'pinia'

export const useChatStore = defineStore('useChatStore', {
    // a function that returns a fresh state
    state: () => ({
        questionAnswerData: [],
    }),

    getters: {

    },
    actions: {
      setQuestionAnswerDat(arr:any) {
            this.questionAnswerData = arr
      },

    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'questionAnswerData',
          storage: window.sessionStorage,
          paths: ['questionAnswerData'],
        },
       
      ]
    }

  })
