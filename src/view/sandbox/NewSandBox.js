import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home/Home'
import Music from './music/Music'
import Note from './note/Note'
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
                <Route path='/music' component={Music} />
                <Route path='/note' component={Note} />
                <Redirect from='/' to='/home'></Redirect>
            </Switch>
            </Content>
            
        </Layout>
    </Layout>
  )
}
