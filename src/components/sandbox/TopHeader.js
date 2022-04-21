import React,{useState} from 'react'
import {Layout, Dropdown,Menu,Avatar} from 'antd';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const { Header} = Layout;

export default function TopHeader() {
  const [collapsed,setCollapsed] = useState(false)
  const changeCollapsed =()=>{
    setCollapsed(!collapsed)
  }

  const menu = (
    <Menu>
      <Menu.Item>{/*头像下拉条*/}
        1111
      </Menu.Item>
      <Menu.Item>
        2222
      </Menu.Item>
      <Menu.Item>
        3333
      </Menu.Item>
      {/*<Menu.Item icon={<DownOutlined />} disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>*/}
    </Menu>

  );
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {/*React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: this.toggle,
      })
      */}
      {/*toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };*/}
      {
        collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> : <MenuFoldOutlined onClick={changeCollapsed}/>
      }
      <div style={{float:"right"}}>
        <Dropdown overlay={menu}>
          <Avatar shape="square" size={'large'} icon={<UserOutlined />} />{/*图标实现 */}
        </Dropdown>
      </div>
    </Header>
  )
}
