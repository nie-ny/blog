import { useEffect } from 'react'
import { BorderBox1 } from '@jiaminghi/data-view-react'
import * as echarts from 'echarts'
import './box.css'

function Box() {
  useEffect(() => {
    const chartDom = document.getElementById('box2-main')
    const myChart = echarts.init(chartDom)
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      // legend: {
      //   textStyle: {
      //     color: '#fff'
      //   }
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
          textStyle: {
            color: '#fff' //坐标值得具体的颜色
          }
        }
      },
      yAxis: {
        type: 'category',
        data: ['广州', '上海', '北京', '成都', '天津', '重庆'],
        axisLabel: {
          textStyle: {
            color: '#fff' //坐标值得具体的颜色
          }
        }
      },
      series: [
        {
          name: '2011',
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230]
        }
      ]
    }
    option && myChart.setOption(option)
  }, [])
  return (
    <div className="box-2">
      <BorderBox1>
        <div id="box2-main" style={{ width: '95%', height: '95%' }}></div>
      </BorderBox1>
    </div>
  )
}

export default Box
