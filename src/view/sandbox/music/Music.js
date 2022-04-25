import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Menu , Input, List, Button} from 'antd';
import './music.css'
import {
  StepForwardOutlined,
} from '@ant-design/icons';
const { Search } = Input;
export default function Music() {
  const [list,setList]=useState([]);
  const [http,setHttp]=useState("#");
  const onSearch = (value) =>{
    axios.get("https://autumnfish.cn/search?keywords=" + value)
    .then(
        res => {
            setList(res.data.result.songs);
        }
    );
  } 
  const play = (id) => {
    setHttp( "https://music.163.com/song/media/outer/url?id="+ id +".mp3")  
  }
  return (
    <div>
        <Search
        placeholder="查找音乐(初步构建)"
        allowClear
        size="middle"
        onSearch={onSearch}
      />
      <div style={{
        height: 620,
        overflow: 'auto',
      }}>
            <List 
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[<StepForwardOutlined />, <a >more</a>]}>
              <List.Item.Meta
                //avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />/*item.icon}*/}
                title={<p onClick={play(item.id)}>{item.name}</p>}
              />
            </List.Item>
          )}
        />,
      </div>
      <audio src={http} controls="controls" autoPlay="autoplay" loop="loop" height="100" width="100"></audio>
    </div>
  )
}
