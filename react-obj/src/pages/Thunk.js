import React from "react";
// 引入 react-redux 中的高阶函数 绑定获取和修改的特殊方法
import { connect } from "react-redux";
// 定义 store的修改类型
import { getUser } from "../store/actionsUser";

function Home(props) {
  const { user = [], getUser} = props;

  return (
    <div>
      <span>我是异步修改数据{user[0]?.name}</span>
      <button onClick={getUser}>修改</button>
    </div>
  );
}
// 获取store中的值到当前组件
function mapStateToProps(state) {
  return {
    user: state.reducer.user,
  };
}

export default connect(mapStateToProps, {getUser})(Home);
