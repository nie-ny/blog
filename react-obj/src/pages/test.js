/**
 * 使用 useContext
 */
import React, { createContext, useContext, useState } from "react";

// 创造一个上下文
const P = createContext(null);

// 创造一个上下文 带默认值
const B = createContext({ value: 3333, count: 12121 });

// 子组件
const Pa = () => {
  // 获取 P--Context
  const { count, setCount } = useContext(P);
  const add = () => {
    setCount((n) => n + 1);
  };

  return <div onClick={add}>pa==P==={count}</div>;
};

// 孙子组件
const Ba = () => {
  // 获取 B--Context
  const value = useContext(B);

  return <div>Ba==B==={value.value}</div>;
};

// 孙子组件
const Bb = () => {
  // 获取 P--Context
  const count = useContext(P);
  // 获取 B--Context
  const value = useContext(B);

  return (
    <div>
      Bb==B==={value.value},Bb==B===默认值==={value.count},<br />
      Pb--P==={count.count},
    </div>
  );
};

// 子组件
const Pb = () => {
  // 获取 P--Context
  const { count, setCount } = useContext(P);
  const add = () => {
    setCount((n) => n + 1);
  };

  return (
    <div>
      <div onClick={add}>Pb==P==={count}</div>
      {/* 加入新的 P--Context */}
      <P.Provider value={{ count: 2222 }}>
        <B.Provider value={{ value: 1111 }}>
          <Ba></Ba>
          <Bb></Bb>
        </B.Provider>
      </P.Provider>
    </div>
  );
};

// 顶级组件
const Home = (props) => {
  const [count, setCount] = useState(0);

  const ssss = useContext(B);
  console.log("🚀 ~ file: Page1.jsx ~ line 69 ~ Home ~ ssss", ssss)
  return (
    <div>
      <P.Provider value={{ count, setCount }}>
        <Pa></Pa>
        <Pb></Pb>
      </P.Provider>
    </div>
  );
};

export default Home;
