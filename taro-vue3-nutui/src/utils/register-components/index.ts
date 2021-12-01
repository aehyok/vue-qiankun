import {
  Button,
  Navbar,
  Icon,
  BackTop,
  InfiniteLoading,
  Divider,
  Tabs,
  TabPane,
  Tabbar,
  TabbarItem
} from '@nutui/nutui-taro';

const register = (app: any) => {
  app.use(Button)
    .use(Navbar)
    .use(BackTop)
    .use(Icon)
    .use(InfiniteLoading)
    .use(Divider)
    .use(Tabs)
    .use(TabPane)
    .use(Tabbar)
    .use(TabbarItem);
};

export default register;
