import React,{useEffect, useState} from 'react'
import {Button , Popover} from 'antd'
import axios from 'axios'
import './home.css'
export default function Home() {
  const [canvas,setCanvas]=useState();
  console.log(canvas);
  const start=(e)=>{
    setCanvas(e.target)
    const ctx = canvas.getContext('2d');
    setBall(
      {
        x : canvas.width / 2,
        y : canvas.height / 2,
        r : 10,
        xspeed:3,
        yspeed:-3,
        speed:3,
        visible:true
      }
    )
    setPaddle(
      {
        x : canvas.width / 2 - 40,
        y : canvas.height - 20,
        w : 80,
        h : 10,
        speed: 8,
        dx : 0,
        visible: true
      }
    )
    const brick = {
      w : 70,
      h : 20,
      padding: 10,
      offsetx : 45,
      offsety : 60,
      visible : true
    };
    const bricks = [];
    for (var i = 0 ; i < 9 ; i ++ ){
      bricks[i] = [];
      for (var j = 0 ; j < 5 ; j ++ ){
          var x = i * (brick.w + brick.padding) + brick.offsetx;
          var y = j * (brick.h + brick.padding) + brick.offsety;
          bricks[i][j] = {x,y,...brick};
      }
    }
    setBricks(bricks)
    //moving part
    //paddle
    const running=()=>{
    paddle.x += paddle.dx;

    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0){
        paddle.x = 0;
    }
    //ball
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;


    // 墙体碰撞
    if(ball.x + ball.r > canvas.width || ball.x - ball.r < 0) 
        ball.xspeed = -ball.xspeed;
    if(ball.y + ball.r > canvas.height || ball.y - ball.r < 0 ) 
        ball.yspeed = -ball.yspeed;

    // 球板碰撞
    if (
        ball.x - ball.r >= paddle.x - paddle.w &&
        ball.x + ball.r <= paddle.x + paddle.w &&
        ball.y + ball.r >= paddle.y
    ){
        ball.yspeed = -ball.speed;
    }

    // 砖块碰撞
    bricks.forEach(col =>{
        col.forEach(b =>{
            if(b.visible){
                if(
                    ball.x - ball.r > b.x && 
                    ball.x + ball.r < b.x + b.w && 
                    ball.y + ball.r > b.y && 
                    ball.y - ball.r < b.y + b.h 
                ){
                    ball.yspeed = -ball.yspeed;
                    b.visible = false;           //碰撞到就返回弹，并且把vis标记为false，令砖块消失

                }
            }
        });
    });


    //撞击到地面，得分清空,并且砖块全部重置
    if (ball.y + ball.r > canvas.height) {
      bricks.forEach(col => {
        col.forEach(b => (b.visible = true));
    });
    }
    //draw part
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //ball
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI * 2);
    ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
    //paddle
    ctx.beginPath();
    ctx.rect(paddle.x,paddle.y,paddle.w,paddle.h);
    ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
    //brick
    bricks.forEach(col => {
      col.forEach(b => {
          console.log();
          ctx.beginPath();
          ctx.rect(b.x,b.y,b.w,b.h);
          ctx.fillStyle = b.visible ? '#0095dd' : 'transparent';
          ctx.fill();
          ctx.closePath();
      });
    });
      
    requestAnimationFrame(running);
  }
  running();
  }
  document.addEventListener('keydown',function(e){
    console.log(e.key);
    if(e.key === 'd' || e.key === 'ArrowRight'){
        paddle.dx = paddle.speed;
    }else if(e.key === 'a' || e.key === 'ArrowLeft'){
        paddle.dx = -paddle.speed;
    }
  })
  document.addEventListener('keyup',function(e){
    if( e.key === 'd' || e.key === 'ArrowRight' ||e.key === 'a' ||e.key === 'ArrowLeft' )
        paddle.dx = 0;
  })
  const [ball,setBall] = useState(
    {
    x: 0,
    y : 0,
    r : 10,
    xspeed:3,
    yspeed:-3,
    speed:3,
    visible:true
    }
  )
  const [paddle,setPaddle] = useState({
      x : 40,
      y : 20,
      w : 80,
      h : 10,
      speed: 8,
      dx : 0,
      visible: true
  })
  const [bricks,setBricks] = useState([
    {
      w : 70,
      h : 20,
      padding: 10,
      offsetx : 45,
      offsety : 60,
      visible : true
    },
  ])
  return (
    <div id="game">
       <Popover content={
         <div>
           <p>用你的右键和左键移动球拍，使球反弹和打破砖块。</p>
           <p>如果你漏了球，你的得分和砖块将被重置。</p>
         </div>
       } title="规则">
      <Button type='primary'>规则</Button>
      </Popover>
      <h1>在框内点击开始游戏（多点几次）</h1>
    <canvas id="canvas" width="800" height="500" onClick={(e)=>{
      start(e);
    }}></canvas>
    </div>
  )
}
