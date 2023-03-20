import { Component } from 'react';
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import { View, Button, Image, Text } from '@tarojs/components';
import ClothingsItem from '../../components/ClothingsItem';
import { deleteClothes } from '../../actions/cart';
import './index.scss';

@connect(({ cart }) => ({
  items: cart.cartItems || []
}))
class Index extends Component {
  constructor() {
    super();
    this.state = {
      // 总价
      totlo: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    // 设置衣袋小红点
    if (this.props.items.length > 0) {
      Taro.setTabBarBadge({
        index: 1,
        text: String(this.props.items.length)
      });
    } else {
      Taro.removeTabBarBadge({
        index: 1
      });
    }

    let totlo = 0;
    this.props.items.forEach((element) => {
      totlo = element.product_price + totlo;
    });
    this.setState({
      totlo
    });
  }

  componentDidHide() {}

  // 跳转首页
  goHome() {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      Taro.navigateTo({
        url: '/pages/home/index'
      });
    } else {
      Taro.switchTab({
        url: '/pages/home/index'
      });
    }
  }

  /**
   * 打开提示框
   */
  clothingNumExplain() {
    const content =
      '“会员每次免费租4件”可付费多租一件，5件封顶；VIP每次免费可租4件会员+1件VIP美衣或者2件会员+2件VIP美衣，或者3件VIP美衣；可付费多租1-2件，5件封顶；';
    Taro.showModal({
      content,
      showCancel: false
    });
  }

  // 删除美衣
  onDeleteClothing = (e) => {
    const id = e.currentTarget.dataset.id;
    Taro.showModal({
      content: '是否删除该美衣？'
    }).then((res) => {
      if (res.confirm) {
        this.props.dispatch(
          deleteClothes({
            id
          })
        );
      }
    });
  };

  /**
   * 下单
   */
  buy() {
    Taro.showToast({
      title: '下单功能完善中～～',
      icon: 'none'
    });
  }

  render() {
    const { items } = this.props;
    const { totlo } = this.state;
    const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB;

    return (
      <View className='cart-page'>
        {items.length == 0 ? (
          <View className='empty'>
            <Image mode='widthFix' src={require('./3.png')} />
            <Button type='primary' className='am-button' onClick={this.goHome}>
              立即去挑选美衣
            </Button>
          </View>
        ) : (
          <View className='isLogin'>
            <Image
              onClick={this.clothingNumExplain}
              mode='widthFix'
              src={require('./1.png')}
            />
            <ClothingsItem
              clothing={items}
              onDeleteClothing={this.onDeleteClothing}
            />
            <View className='bottom-count' style={!isH5 && 'bottom:0;'}>
              <View className='fj'>
                <View>
                  合计：
                  <Text className={!items.length ? 'disabled price' : 'price'}>
                    {totlo}
                  </Text>
                </View>
                <Button
                  className='cart-btn'
                  onClick={this.buy}
                  disabled={!items.length}
                >
                  下单
                </Button>
                <View className='info'>
                  如有失效商品，建议删除，以免占用衣袋件数
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
