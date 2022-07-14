import { useState, useEffect } from 'react'
import './App.css'
import { BorderBox1 } from '@jiaminghi/data-view-react'

function scale() {
  let designWidth = 1920 //设计稿的宽度，根据实际项目调整
  let designHeight = 1080 //设计稿的高度，根据实际项目调整
  let scale =
    document.documentElement.clientWidth / document.documentElement.clientHeight < designWidth / designHeight
      ? document.documentElement.clientWidth / designWidth
      : document.documentElement.clientHeight / designHeight

  return scale
}

function App() {
  const [state, setState] = useState({ scale: 1 })

  useEffect(() => {
    scale()
    setState({
      scale: scale()
    })

    window.onresize = function () {
      setState({
        scale: scale()
      })
    }

    return () => {
      // 清除
      window.onresize = null
    }
  }, [])

  return (
    <div
      className="App"
      style={{
        transform: `scale(${state.scale}) translate(-50%,-50%)`
      }}
    >
      <div className="box-x">
        <BorderBox1>BorderBox1</BorderBox1>
      </div>
    </div>
  )
}

export default App
