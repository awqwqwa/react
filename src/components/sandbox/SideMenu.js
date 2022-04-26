import React,{useEffect, useState} from 'react'
import './index.css'
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  ReadFilled,
  RobotOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import axios from 'axios';
const {Sider} = Layout;
const { SubMenu } = Menu;
function SideMenu(props) {
  const [menuList,setMenuList] = useState(
  [
    {
      "id": 1,
      "title": "游戏",
      "key": "/home",
      "pagepermisson": 1,
      "grade": 1,
      "children": []
    },
    {
      "id": 2,
      "title": "音乐播放器",
      "key": "/music",
      "pagepermisson": 1,
      "grade": 1,
      "children": []
    },
    {
      "id": 3,
      "title": "日志",
      "key": "/note",
      "pagepermisson": 1,
      "grade": 1,
      "children": []
    },
   /* {
      "id": 1,
      "title": "首页",
      "key": "/home",
      "pagepermisson": 1,
      "grade": 1,
      "children": []
    },
    {
      "id": 2,
      "title": "用户管理",
      "key": "/user-manage",
      "pagepermisson": 1,
      "grade": 1,
      "children": [
        {
          "id": 3,
          "title": "添加用户",
          "rightId": 2,
          "key": "/user-manage/add",
          "grade": 2
        },
        {
          "id": 4,
          "title": "删除用户",
          "rightId": 2,
          "key": "/user-manage/delete",
          "grade": 2
        },
        {
          "id": 5,
          "title": "修改用户",
          "rightId": 2,
          "key": "/user-manage/update",
          "grade": 2
        },
        {
          "id": 6,
          "title": "用户列表",
          "rightId": 2,
          "key": "/user-manage/list",
          "pagepermisson": 1,
          "grade": 2
        }
      ]
    },*/
  ]
  )

  const iconList = {
    "/home":<RobotOutlined />,
    "/music":<CustomerServiceOutlined />,
    "/note":<ReadFilled />,
  }

  const checkPagePermission = (item)=>{
    return item.pagepermisson
  }

  const renderMenu = (mlist)=>{
    return mlist.map(item=>{
      if(item.children&&checkPagePermission(item)){
        if(item.children.length){
          return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>}
        else{
          return <Menu.Item key={item.key} icon={iconList[item.key]} onClick={
            ()=>{
              props.history.push(item.key)
            }
          }>{item.title}</Menu.Item>
        }//解决children不存在无法判断问题
      }
      else{
        return <Menu.Item key={item.key} icon={iconList[item.key]} onClick={
          ()=>{
            props.history.push(item.key)
          }
        }>{item.title}</Menu.Item>
      }
    })
  }



  return (

    <Sider trigger={null} collapsible collapsed={true} >
      <div style={{display:"flex",height:"100%","flexDirection":"column"}}>
          <div className="logo">鹿灵的小房子</div>
            <div style={{flex:1,"overflow":"auto"}}>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.location.pathname,{/*控制刷新保持原有路径*/}]} defaultOpenKeys={["/"+props.location.pathname.split("/")[1]]}>
                {renderMenu(menuList)}
                {/*<Menu.Item key="11" icon={<UserOutlined />}>
                  nav 1
                </Menu.Item>
                <Menu.Item key="22" icon={<VideoCameraOutlined />}>
                  nav 2
                </Menu.Item>
                <Menu.Item key="33" icon={<UploadOutlined />}>
                  nav 3
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="Navigation One">
                  <Menu.ItemGroup key="g1" title="Item 1">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup key="g2" title="Item 2">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>*/}
              </Menu>
          </div>
        </div>
        </Sider>
        
  )
}
export default withRouter(SideMenu);//高阶组件包裹低阶组件，使低阶组件可以拿到所有来自父组件的值（包括父组件的父组件之类）