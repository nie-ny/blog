// ----------------- React -----------------

/**
 * 创建文本节点
 * @param {*} text
 */
function createTextElement(text) {
  return {
    type: "TEXT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const React = {};
// type DOM节点的标签名
// attrs 节点上的所有属性
// children 子节点
React.createElement = function (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
};

// ----------------- ReactDOM -----------------
const ReactDOM = {};

// fiber 树
let wipRoot = null
// 上一次提交的树
let currentRoot = null
// 对比后要删除的节点
let deletions = null
/**
 *
 * @param {*} vDom 虚拟DOM
 * @param {*} container 容器
 */
ReactDOM.render = function (element, container) {
  // // 创建 真实DOM
  // const dom = vDom.type == "TEXT"
  //     ? document.createTextNode("")
  //     : document.createElement(vDom.type);

  // // 获取除children 外的所有属性
  // const isProperty = (key) => key !== "children";
  // Object.keys(vDom.props)
  //   .filter(isProperty)
  //   .forEach((name) => {
  //     dom[name] = vDom.props[name];
  //   });

  // // 递归子节点
  // vDom.props.children.forEach((child) => ReactDOM.render(child, dom));

  // // 真实DOM 放入容器中
  // container.appendChild(dom);

  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };

  nextUnitOfWork = wipRoot
  deletions = []
  requestIdleCallback(workLoop);
};

/**
 * 创建节点
 * @param {*} fiber
 */
function createDom(fiber) {
  const dom =
    fiber.type == "TEXT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  // 设置 属性
  updateDom(dom, {}, fiber.props)
  // 获取除children 外的所有属性
  // const isProperty = (key) => key !== "children";
  // Object.keys(fiber.props)
  //   .filter(isProperty)
  //   .forEach((name) => {
  //     dom[name] = fiber.props[name];
  //   });

  return dom;
}

// 要执行的工作单元
let nextUnitOfWork = null;

/**
 * 判断是否有时间继续执行
 * @param {*} deadline
 */
function workLoop(deadline) {
  // 剩余时间判断该
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    // 返回下一个工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (nextUnitOfWork) {
    // 工作单元未执行玩 继续交给浏览器
    requestIdleCallback(workLoop);
  }

  if (!nextUnitOfWork && wipRoot) {
    // 执行完成 渲染
    commitRoot()
  }
}

/**
 * 提交渲染
 */
function commitRoot() {
  // 处理要删除的节点
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  currentRoot = wipRoot // 保存 提交的树
  wipRoot = null
}
/**
 * 修改DOM节点
 * @param {*} fiber 
 */
function commitWork(fiber) {
  if (!fiber) {
    return
  }
  // const domParent = fiber.parent.dom
  // domParent.appendChild(fiber.dom)
  // 获取父节点
  let domParentFiber = fiber.parent;
  // 判断父级 是否有 dom 没有继续向上 找
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  // 获取 最近 上级的 dom
  const domParent = domParentFiber.dom;

  if(fiber.effectTag === "ADD" &&  fiber.dom != null){
    // 新增操作
    domParent.appendChild(fiber.dom)
  }else if(fiber.effectTag === "DELETION" &&  fiber.dom != null){
    // 删除节点
    // domParent.removeChild(fiber.dom);
    commitDeletion(fiber, domParent);
  }else if(fiber.effectTag === "UPDATE" && fiber.dom != null){
    // 节点 修改操作
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }

  // 处理兄弟节点 和子节点
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

/**
 * 删除节点
 * @param {*} fiber 
 * @param {*} domParent 
 */
function commitDeletion(fiber, domParent){
  if(fiber.dom){
    domParent.removeChild(fiber.dom)
  }else{
    commitDeletion(fiber.child, domParent)
  }
}

// 前缀是 on 返回是 true
const isEvent = (key) => key.startsWith("on");
// 去掉 children 和 on 开头的
const isProperty = (key) => key !== "children" && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
// 过滤 匹配 next 中没有的值
const isGone = (prev, next) => (key) => !(key in next);
/**
 * 修改节点
 * @param {*} dom 当前节点的真实dom
 * @param {*} prevProps 上一次的 Props
 * @param {*} nextProps 本次Props
 */
function updateDom(dom, prevProps, nextProps) {
  // console.log("🚀 ~ file: index.js ~ line 202 ~ updateDom ~ nextProps", dom,nextProps)
  // 清空 旧 事件
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // 清空 旧 的值
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // 设置 新 事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });

  // 设置 新 的值
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      if(dom instanceof Object &&  dom.setAttribute){
        dom.setAttribute(name, nextProps[name]);
      }else{
        dom[name] = nextProps[name];
      }
    });
}

/**
 * 操作节点
 * @param {*} fiber
 */
function performUnitOfWork(fiber) {
  // // 创建 真实节点
  // if (!fiber.dom) {
  //   fiber.dom = createDom(fiber);
  // }

  // 是否是组件
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    // 组件
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // // 放入父容器中
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }

  // // 为每个孩子节点创建DOM
  // const elements = fiber.props.children;
  // // 子节点对比
  // reconcileChildren(fiber, elements);
  // let index = 0;
  // // 保存兄弟节点
  // let prevSibling = null;
  // /**
  //  * 为每一个孩子节点创建fiber节点
  //  */
  // while (index < elements.length) {
  //   const element = elements[index];
  //   // 子节点
  //   const newFiber = {
  //     type: element.type,
  //     props: element.props,
  //     parent: fiber,
  //     dom: null,
  //   };

  //   if (index === 0) {
  //     // 如果是第一个元素 就设置为 子节点
  //     fiber.child = newFiber;
  //   } else {
  //     // 不是第一个元素 设置为 前一个的兄弟节点
  //     // 给上一个节点设置兄弟节点
  //     prevSibling.sibling = newFiber;
  //   }
  //   // 缓存上一次 节点
  //   prevSibling = newFiber;
  //   index++;
  // }

  // 查找下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      // 有兄弟节点就 返回兄弟节点
      return nextFiber.sibling;
    }
    // 没兄弟节点 就返回父节点  --继续循环找父节点的兄弟节点.
    nextFiber = nextFiber.parent;
  }
}

/**
 * 非组件 创建
 * @param {*} fiber
 */
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}


let wipFiber = null;// 本次操作的节点
let hookIndex = null;// 状态的个数
/**
 * 组件创建
 * @param {*} fiber
 */
function updateFunctionComponent(fiber) {
  wipFiber = fiber
  hookIndex = 0;// hook的顺序位置
  wipFiber.hooks = []

  // 运行函数 获取 子节点
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

/**
 * 钩子函数
 * @param {*} initial
 */
ReactDOM.useState = function(initial) {
  // 获取之前的 Hook
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex]
  // 修改对应的 hook
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  }

  // 获取上一次 的 修改操作
  const actions = oldHook ? oldHook.queue : []
  // 执行修改
  actions.forEach(action => {
    if(action instanceof Function){
      hook.state = action(hook.state)
    }else{
      hook.state = action
    }
  })

  // 修改状态
  const setState = action => {
    // 保存操作
    hook.queue.push(action)

    // 修改后 更新组件
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    }
    nextUnitOfWork = wipRoot;
    deletions = [];
    // 加入循环
    requestIdleCallback(workLoop);
  }

  // 保存数据进入队列
  wipFiber.hooks.push(hook)
  hookIndex++ // 索引增加
  return [hook.state,setState]
}


/**
 * 对比子节点
 * @param {*} wipFiber 当前操作的节点
 * @param {*} elements 子节点
 */
function reconcileChildren(wipFiber, elements) {
  let index = 0;

  // 上一次提交的 DOM
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

  // 保存兄弟节点
  let prevSibling = null;
  /**
   * 为每一个孩子节点创建fiber节点
   */
  // oldFiber != null 当新子节点变少  删除多余的旧节点用
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    const newFiber = null
    // 类型是否相同
    let sameType = element && oldFiber && element.type === oldFiber.type;

    // 类型相同 复用原来的节点 修改props
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }

    // 类型不同 有新的节点 新建节点
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "ADD",
      };
    }

    // 类型不同 旧节点存在 删除
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);// 收集要删除的节点
    }

    // 当没有兄弟节点 赋值 为空 
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      // 如果是第一个元素 就设置为 子节点
      wipFiber.child = newFiber;
    } else {
      // 不是第一个元素 设置为 前一个的兄弟节点
      // 给上一个节点设置兄弟节点
      prevSibling.sibling = newFiber;
    }
    // 缓存上一次 节点
    prevSibling = newFiber;
    index++;
  }

}



// ----------------- 使用 -----------------
const APPS = ()=>{
  const [state, setState] = ReactDOM.useState(1)
  return (
    <h1 class="bububu" onClick={() => {setState(c => c + 1)}}>
      Count: {state}
    </h1>
  )
}

const APPP = ()=>{
    const [state, setState] = ReactDOM.useState(1)
    return (
      <h1 class={state===2 ? "sss":""} onClick={() => {setState(c => c + 1)}}>
        Countsss: {state}
      </h1>
    )
  }

  const APP = ()=>{
    return (
      <div>
          <APPS />
          <APPP />
      </div>
    )
  }

ReactDOM.render( <APP />,document.getElementById('root'));
