import { Layout, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styles from './MyHeader.module.scss'
const { Header } = Layout

const MyHeader = () => {
    const menu = (
        <Menu>
            <Menu.Item key="1">
                数字农业子系统
            </Menu.Item>
            <Menu.Item key="2">
                乡村治理子系统
            </Menu.Item>
            <Menu.Item key="3">
                数字信息子系统
            </Menu.Item>
            <Menu.Item key="4">
                便民服务子系统
            </Menu.Item>
            <Menu.Item key="5">
                地理信息管理子系统
            </Menu.Item>
            <Menu.Item key="6">
                基础支撑子系统
            </Menu.Item>
            <Menu.Item key="7">
                数据引擎子系统
            </Menu.Item >
        </Menu >
    );
    return (
        <>
            <Header className={styles.header}>
                <div className="logo" />
                {/* <div>乡村治理子系统</div> */}
                <Dropdown overlay={menu} className={styles.rightsystem}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        切换系统 <DownOutlined />
                    </a>
                </Dropdown>
            </Header>
        </>
    )
}

export default MyHeader