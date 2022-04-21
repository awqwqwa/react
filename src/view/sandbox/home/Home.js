import React from 'react'
import {Button} from 'antd'
import axios from 'axios'
export default function Home() {
  const getMessage=()=>{
    /*axios.get(" http://localhost:5000/posts").then(res=>{
      console.log(res.data)
    })*/
      axios.post("http://localhost:5000/posts",{
        title:"3333",
        author:"zhangsan"

      })
  }
  return (
    <div>
      <Button type='primary' onClick={()=>getMessage()}>button</Button>
    </div>
  )
}
