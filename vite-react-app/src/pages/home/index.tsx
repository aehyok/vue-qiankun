import { Menu, Button } from 'antd';

import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { useState } from 'react';
const { SubMenu } = Menu;
export default function Home() {

    const [collapsed, setCollapsed] = useState(false)
    const [current, setCurrent] = useState('mail')
    const toggleCollapsed = () => {
        setCollapsed(collapsed => collapsed = !collapsed)
    };

    const handleClick = (e: { key: any; }) => {
        console.log('click ', e);
        setCurrent(current => current = e.key);
    };
    return (
        <>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <SubMenu key="SubMenu" icon={<SettingOutlined />} title="切换系统">
                    <Menu.Item key="setting:1">数字农业子系统</Menu.Item>
                    <Menu.Item key="setting:2">乡村治理子系统</Menu.Item>
                    <Menu.Item key="setting:3">数字信息子系统</Menu.Item>
                    <Menu.Item key="setting:4">便民服务子系统</Menu.Item>
                    <Menu.Item key="setting:5">地理信息管理子系统</Menu.Item>
                    <Menu.Item key="setting:6">基础支撑子系统</Menu.Item>
                    <Menu.Item key="setting:7">数据引擎子系统</Menu.Item>
                </SubMenu>
            </Menu>


            <div style={{ width: 256 }}>
                <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Option 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ContainerOutlined />}>
                        Option 3
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
            );
        </>
    )
}