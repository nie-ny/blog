import { useEffect } from 'react'
import { BorderBox1 } from '@jiaminghi/data-view-react'
import * as echarts from 'echarts'
import './box.css'

function Box() {
  useEffect(() => {
    const chartDom = document.getElementById('box1-main')
    let chart = echarts.init(chartDom)
    let option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '职位',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '后端' },
            { value: 735, name: '前端' },
            { value: 580, name: 'IOS' },
            { value: 484, name: '安卓' },
            { value: 300, name: '大数据' }
          ]
        }
      ]
    }

    chart.setOption(option)
  }, [])

  return (
    <div className="box-1">
      <BorderBox1>
        <div id="box1-main" style={{ width: '590px', height: '500px' }}></div>
      </BorderBox1>
    </div>
  )
}

export default Box
