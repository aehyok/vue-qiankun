import { Layout, Breadcrumb } from 'antd';
import { Outlet, HashRouter as Router } from 'react-router-dom'
import './App.css'

import MyLayout from './layout/MyHeader'
import MyLeftSide from './layout/MyLeftSide'
const { Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <MyLayout />
        <Layout>
          <MyLeftSide />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout >
    </Router>
  )
}

export default App