import React from "react";

interface pageProps{
  num?:number,
  text:string,
}

function Test(props:pageProps){
  return <div>{props.text}{props.num}</div>;
}

export default function () {

  return <Test text="你好我是页面" num={2}/>;
}