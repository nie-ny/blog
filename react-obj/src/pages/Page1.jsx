import React from "react";
import { connect } from 'react-redux'

function Home(props) {
  const { count } = props;
  return <div>我是页面1--{count}</div>;
}
// 获取store中的值
export default connect((state)=>({count: state.counter.count,}))(Home);
