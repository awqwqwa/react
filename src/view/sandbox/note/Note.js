import React from 'react'
import { Carousel } from 'antd';
export default function UserList() {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <div>
      <p>小游戏目前只是可以运行，而且没有计分，没有暂停，且不支持手机端~</p>
      <p>后续会慢慢完善的吧</p>
      <p>音乐播放器目前可以实现搜索+听歌</p>
      <p>但它甚至不支持后台播放~</p>
      <p>切到其它页面就会没掉~~也是后续慢慢完善吧</p>
      <p>在这里丢一个小轮播图</p>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <p>...算了，下次一定</p>
    </div>
  )
}
