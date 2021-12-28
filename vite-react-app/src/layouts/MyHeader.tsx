import { Layout, Menu, Dropdown, Avatar } from 'antd'
import { DownOutlined,UserOutlined } from '@ant-design/icons'
import styles from './MyHeader.module.scss'
const { Header } = Layout

const MyHeader = () => {
    const logoUrl = "../assets/login/bg.png"
    const backHome = () => { }
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

    const avator = '系统管理员'
    const me = (
        <Menu>
            <Menu.Item key="1">
                修改密码
            </Menu.Item>
            <Menu.Item key="2">
                版本信息
            </Menu.Item>
            <Menu.Item key="3">
                安全退出
            </Menu.Item>
        </Menu >
    )
    return (
        <>
            <div className={styles.headercontainer}>
                <Header className={styles.appheader}>
                    <div className={styles.appheaderleft}>
                        <Avatar shape="square" icon={<UserOutlined/>} alt="" />
                        <span className={styles.appheadertitle}>乡村治理管理子系统</span>
                    </div>
                    <div className={styles.headerright}>
                        <div className={`${styles.commonright} ${styles.color}`} onClick={backHome}>返回主页</div>
                        <div className={styles.commonright}>
                            <Dropdown overlay={menu} className={styles.rightsystem}>
                                <a onClick={e => e.preventDefault()} className={styles.color}>
                                    切换系统 <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                        <div className={styles.commonright}>
                            <Dropdown overlay={me} className={styles.rightsystem}>
                                <div>
                                    <Avatar
                                        icon={<UserOutlined/>}
                                        alt=""
                                        size={25}

                                    /><span className={styles.color}>系统管理员<DownOutlined /></span>
                                </div>
                            </Dropdown>

                        </div >
                    </div >
                </Header >
            </div >
        </>
    )
}

export default MyHeader
