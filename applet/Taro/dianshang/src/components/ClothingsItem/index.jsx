import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';

class ClothingsItem extends Component {
  static propTypes = {
    clothing: PropTypes.array,
    deleteClothing: PropTypes.func
  };

  static defaultProps = {
    clothing: [],
    deleteClothing: function () {}
  };

  render() {
    // onDeleteClothing 父级 删除方法
    // clothing 商品信息
    const { clothing, onDeleteClothing } = this.props;
    return (
      <View className='clothingsItem-page'>
        <View className='WhiteSpace'></View>
        <View className='hr'></View>
        {clothing.map((item) => (
          <View key={item.product_id}>
            <View className='WhiteSpace'></View>
            <View className='clothing'>
              <View className='shop-img'>
                <Image mode='widthFix' src={`${item.images}`} />
              </View>
              <View className='content'>
                <View className='title p'>{item.brand}</View>
                <View className='info p'>{item.name}</View>
                <View className='size p'>
                  {`${item.spu} | ${item.specification || '均码'}`}
                </View>
              </View>
              <View className='edit'>
                <View
                  className='iconfont icon-delete'
                  data-id={item.product_id}
                  onClick={onDeleteClothing}
                />
              </View>
            </View>
            <View className='WhiteSpace'></View>
            <View className='hr'></View>
          </View>
        ))}
      </View>
    );
  }
}

export default ClothingsItem;
