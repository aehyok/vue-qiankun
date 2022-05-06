import { defineStore } from 'pinia';

export default defineStore({
  id: 'aehyok',
  state: () => {
    return {
      count: 0,
      title: 'hello aehyok',
      config: {}
    };
  },
  actions: {
    setConfig(config: any) {
      this.config = config
    }
  }
});
