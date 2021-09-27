export const autoComponentRegister = (app) => {
  const listView = [];
  const register = (componentsContext) => {
    console.log(componentsContext, "componentsContext");
    componentsContext.keys().forEach((filePath) => {
      const fileName = filePath.split("/")[1].split(".")[0];

      const componentConfig = componentsContext(filePath);
      if (/.vue$/.test(filePath)) {
        app.component(fileName, componentConfig.default);
        listView.push(fileName);
      } else {
        app.use(componentConfig);
      }
    });
  };

  const itemView = require.context(
    "../components/form/input/item-view",
    true,
    /View.vue$/
  );
  const composeView = require.context(
    "../components/form/input/compose-view",
    true,
    /View.vue$/
  );
  const detail = require.context('../components/detail/item', true, /.vue$/)
  const view = [itemView, composeView, detail];
  view.forEach((item) => {
    register(item);
  });
  window.componentListView = listView;
};
