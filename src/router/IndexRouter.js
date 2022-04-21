import React from 'react'
import { HashRouter, Route,Switch } from 'react-router-dom'
import Login from '../view/login/Login'
import NewSandBox from '../view/sandbox/NewSandBox'
export default function IndexRouter() {
  return (
    <HashRouter>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" render={()=>
                /*重定向写法，可添加逻辑 */

                <NewSandBox></NewSandBox>
            }/>
        </Switch>
    </HashRouter>
  )
}
