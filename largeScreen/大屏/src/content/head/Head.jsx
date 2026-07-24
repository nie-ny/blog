import { Decoration5, Decoration8 } from '@jiaminghi/data-view-react'
import './head.css'

function head() {
  return (
    <div className="head">
      <Decoration8 style={{ width: '300px', height: '70px' }} />
      <div className="head-title">
        <span>某某大屏项目</span>
        <Decoration5 style={{ width: '500px', height: '90px' }}></Decoration5>
      </div>
      <Decoration8 reverse={true} style={{ width: '300px', height: '70px' }} />
    </div>
  )
}

export default head
