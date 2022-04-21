import React,{useEffect, useState} from 'react'
import './index.css'
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
const {Sider} = Layout;
const { SubMenu } = Menu;
function SideMenu(props) {
  const [menuList,setMenuList] = useState([])

  const iconList = {
    "/home":<UserOutlined />,
    "/user-manage":<UserOutlined />,
    "/user-manage/list":<UserOutlined />,
    "/right-manage":<UserOutlined />,
    "/right-manage/role/list":<UserOutlined />,
    "/right-manage/right/list":<UserOutlined />
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

  useEffect(()=>{
    axios.get("http://localhost:5000/rights?_embed=children").then(
      res=>{
        console.log(res)
        setMenuList(res.data)}
    )
  },[])


  return (

    <Sider trigger={null} collapsible collapsed={false} >
      <div style={{display:"flex",height:"100%","flexDirection":"column"}}>
          <div className="logo">2333</div>
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