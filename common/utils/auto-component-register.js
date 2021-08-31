export const autoComponentRegister = (app) => {
    const register = (componentsContext) => {
        console.log(componentsContext, 'componentsContext')
        componentsContext.keys().forEach((filePath) => {
            const fileName = filePath.split('/')[1].split('.')[0]
            
            const componentConfig = componentsContext(filePath);
            if (/.vue$/.test(filePath)) {
            app.component(fileName, componentConfig.default);
            } else {
            app.use(componentConfig);
            }
        });
    }

    const itemView = require.context('../components/form/input/item-view', true, /.vue$/)
    const composeView = require.context('../components/form/input/compose-view', true, /.vue$/)
    const view = [
        itemView,composeView
    ]
    view.forEach(item =>{
        register(item)
    })
};