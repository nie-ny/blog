import { Component } from 'react';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

export default class Size extends Component {
  componentDidMount = () => {};

  render() {
    return (
      <View className='size-page'>
        <View className='h1'>尺码参照表</View>
        <View className='content'>
          <Image mode='widthFix' src={require('./1.png')}></Image>
          <Text>
            Tips：本表内容仅供参考，因服装款式和材质不同，尺码可能略有差异，请酌情进行选择。
          </Text>
        </View>
      </View>
    );
  }
}
