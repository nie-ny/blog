import { useState, useEffect } from 'react'
import './App.css'
import { BorderBox1 } from '@jiaminghi/data-view-react'

function App() {
  const [state, setState] = useState({ scale: 1 })

  useEffect(() => {
    setState({ scale: 1 })
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
