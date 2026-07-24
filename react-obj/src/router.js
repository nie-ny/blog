import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Thunk from "./pages/Thunk";
import store from "./store/reducer"; // 引入store

// 404
function NotFound(){
    return <div>404</div>;
}

export default function () {
  return (
    <Provider store={store}>
      {/* 把store放入props中让所有子组件都能获取到  */}
      <BrowserRouter>
        <div>
          <div>
            <Link to="/">首页</Link>
          </div>
          <div>
            <Link to="/page1">Page1</Link>
            <br></br>
            <Link to="/page2">page2</Link>
            <br></br>
            <Link to="/thunk">异步修改store</Link>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2} />
            <Route path="/thunk" component={Thunk} />
            {/* 路由找不到 加载404组件 */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
