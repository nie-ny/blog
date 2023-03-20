import { Component } from 'react';
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import { View, Text, Image } from '@tarojs/components';
import MySwiper from '../../components/MySwiper';
import GoodsList from '../../components/GoodsList';
import { load, product, save } from '../../actions/home';

import './index.scss';

@connect(({ home, cart }) => ({
  home,
  ...cart
}))
class Index extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(load());
    dispatch(product());
  };

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    // 设置衣袋小红点
    if (this.props.cartItems.length > 0) {
      Taro.setTabBarBadge({
        index: 1,
        text: String(this.props.cartItems.length)
      });
    } else {
      Taro.removeTabBarBadge({
        index: 1
      });
    }
  }

  componentDidHide() {}

  render() {
    const { home } = this.props;

    return (
      <View className='home-page'>
        <MySwiper banner={home.banner} home></MySwiper>
        <View className='nav-list'>
          {home.brands.map((item, index) => (
            <View className='nav-item' key={index}>
              <Image
                mode='widthFix'
                src={item.image_src}
                style='width: 100%;height: 519px;'
              ></Image>
            </View>
          ))}
        </View>
        <Text className='recommend'>为你推荐</Text>
        <GoodsList list={home.products_list} />
      </View>
    );
  }
}

export default Index;
