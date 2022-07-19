import { useEffect } from 'react'
import { BorderBox1 } from '@jiaminghi/data-view-react'
import * as echarts from 'echarts'
import './box.css'

function Box() {
  useEffect(() => {
    const chartDom = document.getElementById('box5-main')
    const myChart = echarts.init(chartDom)
    const option = {
      legend: {
        data: ['产品A', '产品B'],
        textStyle: {
          color: '#fff' //坐标值得具体的颜色
        }
      },
      radar: {
        indicator: [
          { name: '生产', max: 50000 },
          { name: '销量', max: 50000 },
          { name: '退货', max: 50000 },
          { name: '次品', max: 50000 },
          { name: '合格', max: 50000 }
        ]
      },
      series: [
        {
          name: '产品',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000],
              name: '产品A'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000],
              name: '产品B'
            }
          ]
        }
      ]
    }
    option && myChart.setOption(option)
  }, [])
  return (
    <div className="box-5">
      <BorderBox1>
        <div id="box5-main" style={{ width: '95%', height: '95%' }}></div>
      </BorderBox1>
    </div>
  )
}

export default Box
