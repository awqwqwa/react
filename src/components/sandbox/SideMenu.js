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
  const [menuList,setMenuList] = useState(
  [
    {
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
    },
    {
      "id": 7,
      "title": "权限管理",
      "key": "/right-manage",
      "pagepermisson": 1,
      "grade": 1,
      "children": [
        {
          "id": 8,
          "title": "角色列表",
          "rightId": 7,
          "key": "/right-manage/role/list",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 9,
          "title": "权限列表",
          "rightId": 7,
          "key": "/right-manage/right/list",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 10,
          "title": "修改角色",
          "rightId": 7,
          "key": "/right-manage/role/update",
          "grade": 2
        },
        {
          "id": 11,
          "title": "删除角色",
          "rightId": 7,
          "key": "/right-manage/role/delete",
          "grade": 2
        },
        {
          "id": 12,
          "title": "修改权限",
          "rightId": 7,
          "key": "/right-manage/right/update",
          "grade": 2
        },
        {
          "id": 13,
          "title": "删除权限",
          "rightId": 7,
          "key": "/right-manage/right/delete",
          "grade": 2
        }
      ]
    },
    {
      "id": 14,
      "title": "新闻管理",
      "key": "/news-manage",
      "pagepermisson": 1,
      "grade": 1,
      "children": [
        {
          "id": 15,
          "title": "新闻列表",
          "rightId": 14,
          "key": "/news-manage/list",
          "grade": 2
        },
        {
          "id": 16,
          "title": "撰写新闻",
          "rightId": 14,
          "key": "/news-manage/add",
          "grade": 2,
          "pagepermisson": 1
        },
        {
          "id": 17,
          "title": "新闻更新",
          "rightId": 14,
          "key": "/news-manage/update/:id",
          "grade": 2,
          "routepermisson": 1
        },
        {
          "id": 18,
          "title": "新闻预览",
          "rightId": 14,
          "key": "/news-manage/preview/:id",
          "grade": 2,
          "routepermisson": 1
        },
        {
          "id": 19,
          "title": "草稿箱",
          "rightId": 14,
          "key": "/news-manage/draft",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 20,
          "title": "新闻分类",
          "rightId": 14,
          "key": "/news-manage/category",
          "pagepermisson": 1,
          "grade": 2
        }
      ]
    },
    {
      "id": 21,
      "title": "审核管理",
      "key": "/audit-manage",
      "pagepermisson": 1,
      "grade": 1,
      "children": [
        {
          "id": 22,
          "title": "审核新闻",
          "rightId": 21,
          "key": "/audit-manage/audit",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 23,
          "title": "审核列表",
          "rightId": 21,
          "key": "/audit-manage/list",
          "pagepermisson": 1,
          "grade": 2
        }
      ]
    },
    {
      "id": 24,
      "title": "发布管理",
      "key": "/publish-manage",
      "pagepermisson": 1,
      "grade": 1,
      "children": [
        {
          "id": 25,
          "title": "待发布",
          "rightId": 24,
          "key": "/publish-manage/unpublished",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 26,
          "title": "已发布",
          "rightId": 24,
          "key": "/publish-manage/published",
          "pagepermisson": 1,
          "grade": 2
        },
        {
          "id": 27,
          "title": "已下线",
          "rightId": 24,
          "key": "/publish-manage/sunset",
          "pagepermisson": 1,
          "grade": 2
        }
      ]
    }
  ]
  )

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