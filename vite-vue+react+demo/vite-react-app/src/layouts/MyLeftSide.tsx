import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd'
import React from 'react'
import styles from './MyLeftSide.module.scss'
const { SubMenu } = Menu;
const { Sider } = Layout;
import { Link } from 'react-router-dom'
const MyLeftSide = () => {
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'];
    const [openKeys, setOpenKeys] = React.useState(['sub1']);
    const onOpenChange = (keys: any) => {
        const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <div className={styles.leftsidecontainer}>
            <Sider width={200} className={styles.myleftside}  >
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    className={styles.leftmenu}
                    openKeys={openKeys} onOpenChange={onOpenChange}
                >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="户码信息管理">
                        <Menu.Item key="1">
                            <Link to="/sys/about">户码管理</Link>
                        </Menu.Item>
                        <Menu.Item key="2"><Link to="/sys/home">门牌名管理</Link></Menu.Item>
                        <Menu.Item key="3" ><Link to="/sys/list">门牌模版管理</Link></Menu.Item>
                        <Menu.Item key="4" ><Link to="/sys/detail">门牌标签管理</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="人口信息管理">
                        <Menu.Item key="5">户籍人口</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="sub3" icon={<NotificationOutlined />} >土地管理</Menu.Item>
                    <Menu.Item key="sub4" icon={<NotificationOutlined />} >外出务工管理</Menu.Item>
                    <Menu.Item key="sub5" icon={<NotificationOutlined />} >收入来源管理</Menu.Item>
                    <SubMenu key="sub6" icon={<NotificationOutlined />} title="疫情防控管理">
                        <Menu.Item key="11">疫情防控台账</Menu.Item>
                        <Menu.Item key="12">新冠疫苗接种登记</Menu.Item>
                        <Menu.Item key="13">返乡人员登记</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        </div>
    )
}

export default MyLeftSide