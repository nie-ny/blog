// ----------------- React -----------------

const React = {};
// tag DOM节点的标签名
// attrs 节点上的所有属性
// children 子节点
React.createElement = function (tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
  };
};

// 基类
React.Component = class Component {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }
  setState(stateChange) {
    // 保存上一次的状态
    this.oldState = JSON.parse(JSON.stringify(this.state));
    // 合并 state
    // Object.assign(this.state, stateChange);
    // 更新组件状态
    // renderComponent(this);
    // 异步state
    enqueueSetState(stateChange, this);
  }

  render() {
    throw "组件无渲染！！！";
  }
};

// ----------------- ReactDOM -----------------

const ReactDOM = {};
/**
 *
 * @param {*} vDom 虚拟DOM
 * @param {*} container 容器
 */
ReactDOM.render = function (vDom, container) {
  container.innerHTML = ""; // 清空容器
  // 放入容器中
  return container.appendChild(diffNode(null, vDom));
};

/**
 * 创建真实节点
 * @param {*} vDom 虚拟DOM
 * @param {*} container 容器
 */
function initComponent(vDom) {
  // 错误节点 修改为空
  if (vDom === null || vDom === undefined || typeof vDom === "boolean")
    vDom = "";
  // 文本返回文本节点
  if (typeof vDom === "number" || typeof vDom === "string") {
    vDom = String(vDom);
    let textNode = document.createTextNode(vDom);
    return textNode;
  }
  // 组件DOM
  if (typeof vDom === "object" && typeof vDom.tag === "function") {
    //先创建组件
    const component = createComponent(vDom.tag, vDom.attrs);
    // 设置属性
    setComponentProps(component, vDom.attrs);
    //返回的是真实dom对象
    return component.DOM;
  }

  // 默认节点
  if (typeof vDom === "object" && typeof vDom.tag === "string") {
    // 虚拟DOM 生成真实节点
    const dom = document.createElement(vDom.tag);
    // 添加属性
    setAttr(dom, vDom.attrs);
    if (vDom.children) {
      // 有子节点 重复操作
      vDom.children.forEach((child) => dom.appendChild(initComponent(child)));
    }
    return dom;
  }
}

/**
 * 节点对比
 * @param {*} dom 真实DOM
 * @param {*} vDom 虚拟DOM
 */
function diffNode(dom, vDom) {
  let newDom = dom;
  // 错误节点 修改为空
  if (vDom === null || vDom === undefined || typeof vDom === "boolean")
    vDom = "";
  // 文本对比
  if (typeof vDom === "number" || typeof vDom === "string") {
    vDom = String(vDom);
    // 如果当前的DOM就是文本节点，则直接更新内容
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vDom) {
        dom.textContent = vDom;
      }
    } else {
      // 创建节点
      newDom = document.createTextNode(vDom);
      // 判断当前 真实DOM 是否存在 如果是 就替换节点
      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(dom, newDom);
      }
    }
    return newDom;
  }

  // 组件对比
  if (typeof vDom === "object" && typeof vDom.tag === "function") {
    return diffComponent(newDom, vDom);
  }

  // 默认节点对比
  if (typeof vDom === "object" && typeof vDom.tag === "string") {
    // console.log("🚀 ~ file: index.js ~ line 129 ~ diffNode ~ dom", newDom,vDom)
    // 判断 节点 类型 是否相同
    if (!dom || !isSameNodeType(dom, vDom)) {
      // 创建 新节点
      newDom = document.createElement(vDom.tag);
      if (dom) {
        if (vDom.children) {
          // 当 虚拟DOM有子节 时 将原来的子节点移到新节点下
          [...dom.childNodes].map(newDom.appendChild);
        }
        if (dom.parentNode) {
          // 移除掉原来的DOM对象
          dom.parentNode.replaceChild(newDom, dom);
        }
      }
      // 修改属性
      diffAttributes(newDom, vDom);
    }

    //
    if (
      (vDom.children && vDom.children.length > 0) ||
      (newDom.childNodes && newDom.childNodes.length > 0)
    ) {
      diffChildren(newDom, vDom.children);
    }

    return newDom;
  }
}

/**
 * 组件类型 处理
 * @param {*} dom 真实DOM
 * @param {*} vDom 虚拟DOM
 */
function diffComponent(dom, vDom) {
  // 之前的虚拟DOM
  let comp = dom && dom._component;
 
  if (comp && comp.constructor === vDom.tag) {
    // 之前的虚拟DOM 和 现在的是同一个
    setComponentProps(comp, vDom.attrs);
    // 获取最新的 真实DOM
    dom = comp.DOM;
  } else {
    // 当两次虚拟DOM 不同 删除之前的组件
    if (comp) {
      unmountComponent(comp);
    }
    // 先创建新组件
    const component = createComponent(vDom.tag, vDom.attrs);
    // 设置属性 生成组件DOM
    setComponentProps(component, vDom.attrs);
    // 获取最新的 真实DOM
    dom = component.DOM;
    
  }
  return dom;
}

/**
 * 修改节点 属性
 * @param {*} dom 真实DOM
 * @param {*} vDom 虚拟DOM
 */
function diffAttributes(dom, vDom) {
  const olds = {}; // 旧DOM的属性
  const attrs = vDom.attrs; // 虚拟DOM的属性
  for (let i = 0; i < dom.attributes.length; i++) {
    const attr = dom.attributes[i];
    olds[attr.name] = undefined;
  }
  // 如果原来的属性不在新的属性当中，则将其移除掉（属性值设为undefined）
  setAttr(dom, olds);
  // 更新新的属性值
  setAttr(dom, attrs);
}

/**
 * 子组件对比
 * @param {*} dom
 * @param {*} vchildren
 */
function diffChildren(dom, vchildren) {
  console.log("🚀 ~ file: index.js ~ line 129 ~ diffNode ~ dom", dom,vchildren)
  // 获取原来的节点
  const domChildren = dom.childNodes;
  const keyed = {};
  // 将有key的节点获取
  if (domChildren.length > 0) {
    for (let i = 0; i < domChildren.length; i++) {
      const child = domChildren[i];
      const key = child._component?.props?.key;
      if (key) {
        keyed[key] = child;
      }
    }
  }

  // 子节点 对比
  if (vchildren && vchildren.length > 0) {

    for (let i = 0; i < vchildren.length; i++) {
      const vchild = vchildren[i];
      const key = vchild.attrs?.key;
      let child; // 旧的真实节点

      // 如果有key，找到对应key值的节点
      if (key) {
        if (keyed[key]) {
          child = keyed[key];
          keyed[key] = undefined;
        }
      }
      console.log(child,vchild,keyed)
      
      // 对比节点返回 新节点
      let newChild = diffNode(child, vchild);

      // 获取当前 虚拟DOM对应的真实节点
      const f = domChildren[i];

      if (newChild && newChild !== dom && newChild !== f) {
        if (!f) {
          // 如果更新前的对应位置为空，说明此节点是新增的
          dom.appendChild(newChild);
        } else if (newChild === f.nextSibling) {
          // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
          removeNode(f);
        } else {
          // 将更新后的节点移动到正确的位置
          // 在已有节点之前插入
          // 注意insertBefore的用法，第一个参数是要插入的节点，第二个参数是已存在的节点
          dom.insertBefore(newChild, f);
          if (!child) {
            removeNode(f);
          }
        }
      }
    }
  }
}

// ----------------- 公用方法 -----------------

/**
 * 删除组件 并调用离开生命周期
 * @param {*} component
 */
function unmountComponent(component) {
  if (component.willUnmount) component.willUnmount();
  removeNode(component.DOM);
}

/**
 *  删除 真实节点
 * @param {*} dom
 */
function removeNode(dom) {
  if (dom && dom.parentNode) {
    dom.parentNode.removeChild(dom);
  }
}

/**
 * 判断真实节点 和 虚拟DOM类型是否相同
 * @param {*} dom
 * @param {*} VDOM
 */
function isSameNodeType(dom, VDOM) {
  if (typeof VDOM === "string" || typeof VDOM === "number") {
    return dom.nodeType === 3;
  }
  if (typeof VDOM.tag === "string") {
    return dom.nodeName.toLowerCase() === VDOM.tag.toLowerCase();
  }
  return dom && dom._component && dom._component.constructor === VDOM.tag;
}

/**
 * 创建组件
 * @param {*} component 函数组件
 * @param {*} props 属性值
 */
function createComponent(component, props) {
  let comp;
  // 根据原型判断 是否是 继承基类的组件
  if (component.prototype && component.prototype.render) {
    // 返回实例化组件
    comp = new component(props);
  } else {
    comp = new React.Component(props);
    // 修改构造函数 取消默认的 state
    comp.constructor = component;
    // 当执行 render 默认执行函数 并获取 return 中的 jsx
    comp.render = function () {
      return this.constructor(props);
    };
  }

  return comp;
}

/**
 * 修改组件属性值
 * @param {*} component 函数组件
 * @param {*} props 属性值
 */
function setComponentProps(component, props) {
  // 是否保存 真实DOM 后面生成节点时 创建
  if (!component.DOM) {
    // 声明周期函数 初始化  第一次加载组件执行
    if (component.willMount) component.willMount();
  } else if (component.base && component.receiveProps) {
    // 后续修改 props 执行
    component.receiveProps(props);
  }

  // 修改保存 props
  component.props = props;

  // 生成对应真实DOM
  renderComponent(component);
}

/**
 * 生成对应真实DOM 并替换 旧DOM
 * @param {*} component 函数组件
 */
function renderComponent(component) {
  let DOM;

  // 获取 组件的虚拟DOM
  const vDom = component.render();

  // 生命周期函数 修改 st
  if (component.DOM && component.willUpdate) component.willUpdate();

  // 判断组件 是否继续进行 更新操作
  if (component.DOM && component.shouldUpdate) {
    // 如果组件经过了初次渲染，是更新阶段，那么可以根据这个生命周期判断是否更新
    let result = true;
    // 声明周期判断 是否继续
    result =
      component.shouldUpdate &&
      component.shouldUpdate(component.props, component.state);
    if (!result) {
      // 终止更新 不修改对应的 state
      component.state = JSON.parse(JSON.stringify(component.oldState));
      component.prevState = JSON.parse(JSON.stringify(component.oldState));
      return;
    }
  }

  // 得到真实DOM
  // DOM = initComponent(vDom);
  DOM = diffNode(component.DOM, vDom);

  if (component.DOM) {
    // 后续 修改状态后 执行
    if (component.didUpdate) component.didUpdate();
  } else if (component.didMount) {
    // 第一次 DOM加载完后执行
    component.didMount();
  }

  // 修改状态后  生成新的 真实DOM 替换旧的DOM
  if (component.DOM && component.DOM.parentNode) {
    component.DOM.parentNode.replaceChild(DOM, component.DOM);
  }
  // 绑定真实DOM
  component.DOM = DOM;
  // DOM绑定 本次组件
  DOM._component = component;
}

/**
 * 修改属性
 * @param {*} dom 真实节点
 * @param {*} attrs 属性 数组对象
 */
function setAttr(dom, attrs) {
  Object.keys(attrs || []).forEach((key) => {
    const value = attrs[key];
    if (key === "style") {
      // 样式
      if (value && typeof value === "object") {
        for (let name in value) {
          dom.style[name] = value[name];
        }
      } else {
        dom.removeAttribute(key);
      }
    } else if (/on\w+/.test(key)) {
      // 事件处理 直接赋值
      key = key.toLowerCase();
      dom[key] = value || "";
      if (!value) {
        dom.removeAttribute(key);
      }
    } else {
      // 当值为空 删除属性
      if (value) {
        dom.setAttribute(key, value);
      } else {
        dom.removeAttribute(key);
      }
    }
  });
}

let setStateQueue = []; // state队列
let renderQueue = []; // 组件队列
/**
 * 合并本次的所有 state
 * @param {*} stateChange
 * @param {*} component
 */
function enqueueSetState(stateChange, component) {
  // 合并操作的微任务只需要执行一次
  if (setStateQueue.length === 0) {
    defer(flush);
  }

  // 合并 state 队列
  setStateQueue.push({ stateChange, component });
  // 只放入不存在的组件
  if (!renderQueue.some((item) => item === component)) {
    renderQueue.push(component);
  }
}

/**
 * 执行合并 state 和 更新组件
 * 并清空 state队列 和 组件队列
 */
function flush() {
  let item, component;

  while ((item = setStateQueue.shift())) {
    const { stateChange, component } = item;
    // 是否存在 上一个 state 不存在 添加 第一个
    if (!component.prevState) {
      component.prevState = Object.assign({}, component.state);
    }
    // 判断是否是方法
    if (typeof stateChange === "function") {
      // 合并 方法 返回的值 未最新 state
      Object.assign(
        component.state,
        stateChange(component.prevState, component.props)
      );
    } else {
      // 合并state
      Object.assign(component.state, stateChange);
    }

    // 更新 下一次 prevState 为最新
    component.prevState = component.state;
  }

  while ((component = renderQueue.shift())) {
    // 更新组件
    renderComponent(component);
  }
}

// 事件执行机制 主任务全部执行完后 执行 微任务
function defer(fn) {
  return Promise.resolve().then(fn);
}

// ----------------- 使用 -----------------
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
  }

  // 中断更新
  shouldUpdate(po, st) {
    console.log("st", st, po);
    if (st.num > 3) {
      return false;
    }
    return true;
  }

  willMount() {
    console.log("初始化");
  }

  but() {
    // for (let i = 0; i < 10; i++) {
    this.setState((pre) => {
      return { num: 1 + pre.num };
    });
    // }
  }
  render() {
    return (
      <h1>
        <button type="button" onclick={this.but.bind(this)}>
          +
        </button>
        {this.state.num}, {this.props.name}
      </h1>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
  }

  but() {
    this.setState({ num: this.state.num + 1 });
  }

  render() {
    return (
      <div>
        <button type="button" onclick={this.but.bind(this)}>
          +
        </button>
        <Home key={1} name={`你好`} />
        {this.state.num === 1 ? (<div>1213</div>) : ""}
        <Home key={2} name={"你好"} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
