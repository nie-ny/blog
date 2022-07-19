import { useState, useEffect } from 'react'
import { scale } from './util'
import { Box1, Box2, Box3, Box4, Box5, Head } from './content'
import './App.css'

function App() {
  const [state, setState] = useState({ scale: 1 })
  useEffect(() => {
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
      <Head></Head>
      <Box1 />
      <Box2 />
      <Box3 />
      <Box4 />
      <Box5 />
    </div>
  )
}

export default App
