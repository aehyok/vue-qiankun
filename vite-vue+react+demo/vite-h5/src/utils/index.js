(function (pkg) {
  var STATE = '_android_back';
  // 维护处理方法的栈
  var _android_back_handles = [];
  // 触发一次popstate方法，则调用最新处理方法
  var handlePopstate = function () {
      var handle = _android_back_handles.pop();
      handle && handle();
  };
  // 通过调用listen方法添加处理方法
  var listen = function (handle) {
      _android_back_handles.push(handle);
  };
  // 通过调用push方法，新增一条历史记录，并添加对应处理方法
  var push = function (state, handle) {
      if (handle) {
          history.pushState(state, null, location.href);
          handle && _android_back_handles.push(handle);
      }
  };

  const init = function () {
      // 通过调用 history.pushState() 方法添加一条历史记录
      history.pushState(STATE, null, location.href);
      // 监听 popstate 事件，当点击Android物理返回键时，会触发该事件
      window.addEventListener('popstate', handlePopstate);
      this.listen = listen;
      this.push = push;
  };

  init.call(window[pkg] = window[pkg] || {});
})('AndroidBack');
