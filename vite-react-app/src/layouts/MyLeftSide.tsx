import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd'

import Detail from '../pages/Detail'
import List from '../pages/list'
import Index from '../pages/Home/index'
import './MyLeftSide.css'
const { SubMenu } = Menu;
const { Sider } = Layout;
import { useHistory, useLocation, To } from 'react-router-dom'
const MyLeftSide = () => {
    const navigate = useHistory()
    const redirectTo = (path: To) => {
        navigate(path)
    }

    const menusList = [
        {
            name: '首页',
            path: '/index'
        },
        {
            name: '列表',
            path: '/list'
        },
        {
            name: '详情',
            path: '/detail'
        },
    ]

    return (
        <Sider width={200} className="my-left-side" style={{ background: '#0f2144' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<UserOutlined />} title="户码信息管理">
                    <Menu.Item key="1">户码管理</Menu.Item>
                    <Menu.Item key="2">门牌名管理</Menu.Item>
                    <Menu.Item key="3" onClick={() => redirectTo('/index')}>门牌模板管理</Menu.Item>
                    <Menu.Item key="4" onClick={() => redirectTo('/list')}>门牌标签管理</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="人口信息管理">
                    <Menu.Item key="5">户籍人口</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="土地管理">
                </SubMenu>
                <SubMenu key="sub4" icon={<NotificationOutlined />} title="外出务工管理">
                </SubMenu>
                <SubMenu key="sub5" icon={<NotificationOutlined />} title="收入来源管理">
                </SubMenu>
                <SubMenu key="sub6" icon={<NotificationOutlined />} title="疫情防控管理">
                    <Menu.Item key="11">疫情防控台账</Menu.Item>
                    <Menu.Item key="12">新冠疫苗接种登记</Menu.Item>
                    <Menu.Item key="13">返乡人员登记</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
}

export default MyLeftSide