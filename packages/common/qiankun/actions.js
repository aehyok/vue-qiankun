function emptyAction() {
  console.warn("Current execute action is empty!");
}

class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction
  };

  /**
   * @name 设置 actions
   */
  setActions(actions) {
    this.actions = actions;
  }

  /**
   * @name 映射
   */
  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange(...args);
  }

  /**
   * @name 映射
   */
  setGlobalState(...args) {
    return this.actions.setGlobalState(...args);
  }
}

const actions = new Actions();

export default actions;
