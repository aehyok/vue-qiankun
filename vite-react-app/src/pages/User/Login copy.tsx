
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import React from 'react';

import useStore from '../../store';
import cls from './index.module.less';

const Login: React.FC = () => {
  const { login, loading } = useStore((state: any) => ({ ...state }));

  const onFinishClick = ({ username, password }: any) => {
    if (username === 'admin' && password === '123456') {
      return login({ username, password });
    }
    message.error('账号或密码错误，请重试！');
  }
  return (
    <div className={cls.loginBox}>
      <Card className="_bg" bordered={false}>
        <Form
          onFinish={onFinishClick}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<UserOutlined />} placeholder="请输入用户名：admin" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input prefix={<LockOutlined />} placeholder="请输入密码：123456" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className={cls.button}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;