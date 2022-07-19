import { useEffect } from 'react'
import './App.css'
import { BorderBox1 } from '@jiaminghi/data-view-react'

// 等比 计算 fontSize
function setFontSize() {
  let designWidth = 1920 //设计稿的宽度，根据实际项目调整
  let designHeight = 1080 //设计稿的高度，根据实际项目调整
  var fontSize =
    document.documentElement.clientWidth / document.documentElement.clientHeight < designWidth / designHeight
      ? (document.documentElement.clientWidth / designWidth) * 100
      : (document.documentElement.clientHeight / designHeight) * 100
  document.querySelector('html').style.fontSize = fontSize + 'px'
}

// 防抖 在一定时间内 只执行最后一次
const debounce = (fn, delay) => {
  let timer
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

function App() {
  useEffect(() => {
    setFontSize()
    const cancalDebounce = debounce(setFontSize, 100)
    // 监听
    window.addEventListener('resize', cancalDebounce)

    return () => {
      // 移除
      window.removeEventListener('resize', cancalDebounce)
    }
  }, [])

  return (
    <div className="App">
      <div className="box-x">
        <BorderBox1>这是一个框</BorderBox1>
      </div>
    </div>
  )
}

export default App
