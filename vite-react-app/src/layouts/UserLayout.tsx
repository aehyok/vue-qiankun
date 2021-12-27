import { Layout, Typography } from 'antd';
import React from 'react';
import { renderRoutes } from 'react-router-config';

import type { IRouteConfig } from '@/routes/config';

const { Content, Footer } = Layout;
const { Text } = Typography;

const UserLayout: React.FC<{ route: IRouteConfig }> = ({ route }) => {
  return (
    <>
      {renderRoutes(route.routes)}
    </>

  );
};
export default UserLayout;
