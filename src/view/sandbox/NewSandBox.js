import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import './NewSandBox.css';

import { Layout} from 'antd';
const {Content } = Layout;

export default function NewSandBox() {
  return (
    <Layout>
        <SideMenu></SideMenu>
        <Layout className="site-layout">
            <TopHeader></TopHeader>
            <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
                <Route path='/home' component={Home} />
                <Route path='/user-manage/list' component={UserList} />
                <Route path='/right-manage/role/list' component={RoleList} />
                <Route path='/right-manage/right/list' component={RightList} />
                <Redirect from='/' to='/home'></Redirect>
            </Switch>
            </Content>
            
        </Layout>
    </Layout>
  )
}
