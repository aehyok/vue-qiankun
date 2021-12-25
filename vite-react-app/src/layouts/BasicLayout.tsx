import { Layout, Breadcrumb } from 'antd';
import { renderRoutes } from 'react-router-config';
import type { IRouteConfig } from '@/routes/config';

import MyLayout from './MyHeader'
import MyLeftSide from './MyLeftSide'
const { Content } = Layout;

const BasicLayout: React.FC<{ route: IRouteConfig }> = ({ route }) => {
  return (
      <>
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
                {renderRoutes(route.routes)}
             </Content>
           </Layout>
         </Layout>
       </Layout >
    </>
  )
}

export default BasicLayout




