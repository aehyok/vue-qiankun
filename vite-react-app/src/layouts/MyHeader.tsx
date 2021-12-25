import { Layout, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import './MyHeader.css'
const { Header } = Layout

const MyHeader = () => {
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    数字农业子系统
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    乡村治理子系统
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    数字信息子系统
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    便民服务子系统
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    地理信息管理子系统
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    基础支撑子系统
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    数据引擎子系统
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <Header className="header">
                <div className="logo" />
                {/* <div>乡村治理子系统</div> */}
                <Dropdown overlay={menu} className='right-system'>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        切换系统 <DownOutlined />
                    </a>
                </Dropdown>
            </Header>
        </>
    )
}

export default MyHeader