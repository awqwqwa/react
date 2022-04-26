import React,{useState} from 'react'
import {Layout, Dropdown,Menu,Avatar,Image,Badge} from 'antd';
import {
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
        啊啊啊~被发现啦
      </Menu.Item>
      <Menu.Item>
        别看了，点我们没意义的
      </Menu.Item>
      <Menu.Item onClick={()=>{
        alert("哈哈哈你发现了彩蛋")
      }}>
        楼上说的没错
      </Menu.Item>
    </Menu>

  );
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {
        collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> : <MenuFoldOutlined onClick={changeCollapsed}/>
      }
      <div style={{float:"right"}}>
        <Dropdown overlay={menu}>
          <Avatar shape="square" size={'large'} icon={ <Badge count={3}><Image src='../logo192.png' /></Badge>} />{/*图标实现 */}
        </Dropdown>
      </div>
    </Header>
  )
}
