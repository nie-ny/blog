import React, { useEffect, useState } from "react";
// 引入 react-redux 中的高阶函数 绑定获取和修改的特殊方法
import { connect } from "react-redux";
import axios from "axios";
// 定义 store的修改类型
import { addAction, reduceAction } from "../store/action";

import timg from "../images/timg.jpg";

import "./home.css";
import "./home.less";

function Home(props) {
  const { count, onAddClick, onReduceClick } = props;

  // 使用HOOK state
  const [state, setState] = useState([]);

  // 使用HOOK 副作用函数 --第二个参数为空表示 子执行一次
  // 有值 表示对应的值修改 就在执行一次
  useEffect(() => {
    // 发送请求
    axios.get("/api/users").then((res) => {
      let data = JSON.parse(res.request.responseText);
      setState(data);
    });
  }, []);

  return (
    <>
      <div className="home">
        <span className="hLess">
          {state[0]?.name}--我是首页计数器{count}
        </span>
        <button onClick={onAddClick}>加</button>
        <button onClick={onReduceClick}>减</button>
      </div>
      <img src={timg} alt="图" />
    </>
  );
}
// 获取store中的值到当前组件
function mapStateToProps(state) {
  return {
    count: state.counter.count,
  };
}
// 修改store中的值
function mapDispatchToProps(dispatch) {
  // 获取action.js 中定义的特殊类型
  return {
    onAddClick: () => dispatch(addAction),
    onReduceClick: () => dispatch(reduceAction),
  };
}
// connect接收两个参数 叫什么都行
// 第一个参数获取 reducer.js 中 counter 定义的state的值
// 第二个参数通过 回调 dispatch 传入指定类型 来修改 reducer.js 中 counter 定义的state
export default connect(mapStateToProps, mapDispatchToProps)(Home);
