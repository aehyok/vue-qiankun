import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd'

import styles from './MyLeftSide.module.scss'
const { SubMenu } = Menu;
const { Sider } = Layout;
import { Link } from 'react-router-dom'
const MyLeftSide = () => {
    // const navigate = useHistory()
    // const redirectTo = (path: To) => {
    //     navigate(path)
    // }

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
        <Sider width={200} className={styles.myleftside}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
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