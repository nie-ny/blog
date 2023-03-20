import { Component } from 'react';
import { connect } from 'react-redux';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import MySwiper from '../../components/MySwiper';
import { save } from '../../actions/cart';

// 请求模拟数据
import { cartItems } from './cartItems.js';
import './index.scss';

@connect(({ cart }) => ({
  items: cart.cartItems || []
}))
export default class Detail extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      // goodsId: '',
      detail: {},
      imageObj: [],
      // goodsdata: [],
      // cartAmount: '',
      // 选中尺码
      currentChooseId: '',
      // 尺码名称
      currentChooseName: '',
      specificationsList: []
      // showModal: false,
      // closeModalType: 0,
      // modalContent: ''
    };
  }

  componentDidMount = () => {
    let { id } = getCurrentInstance().router.params;
    // this.setState({
    //   goodsId: id
    // });
    this.getGoodsInfo(id);
  };

  /**
   * 加载详细数据
   * @param {*} goodsId
   */
  async getGoodsInfo(goodsId) {
    // const res = await detailApi.getProductInfo({
    //   id: goodsId
    // });
    // if (res.status == 'ok') {
    // cartItems.measurement 尺码 胸围
    if (cartItems.measurement != null) {
      cartItems.measurement = String(cartItems.measurement).split('\n');
    } else {
      cartItems.measurement = [];
    }
    // cartItems.comments // 评论消息
    if (cartItems.comments.rows) {
      Array.from(cartItems.comments.rows).forEach((item) => {
        switch (item.fit_score) {
          case 1:
            item.fit_text = '尺码偏小';
            break;
          case 2:
            item.fit_text = '尺码正好';
            break;
          case 3:
            item.fit_text = '尺码偏大';
            break;
          default:
            break;
        }
        item.satisfied_score = new Array(item.satisfied_score);
      });
    }
    let imgList;
    if (cartItems.image) {
      imgList = cartItems.image.map((item) => {
        return {
          image_src: item
        };
      });
    } else {
      imgList = [
        {
          image_src:
            'http://static-r.msparis.com/uploads/d/1/d1ca37e902e5550ad2c82c721bc216ce.png'
        }
      ];
    }
    Taro.setNavigationBarTitle({
      title: cartItems.name
    });

    // specifications 衣服规格
    // imgList 展示图片
    this.setState({
      detail: cartItems,
      imageObj: imgList,
      specificationsList: cartItems.specifications
    });
    // }
  }

  // 进入尺码页
  openSize() {
    Taro.navigateTo({
      url: '/pages/size/index'
    });
  }

  /**
   * 加入购物车
   * @returns
   */
  join = async () => {
    // if (!Taro.getStorageSync('access_token')) {
    //   Taro.navigateTo({
    //     url: '/pages/login/index'
    //   });
    //   return;
    // }
    if (
      this.state.detail.mode_id == 3 &&
      (this.state.detail.enabled != 1 || this.state.detail.sale_stock == 0)
    ) {
      Taro.showToast({
        title: '商品已售罄',
        icon: 'none'
      });
      return;
    }
    if (this.state.currentChooseId === '') {
      Taro.showToast({
        title: '请选择尺码',
        icon: 'none'
      });
      return;
    }

    if (this.state.detail.enabled == 1) {
      const { detail, currentChooseId, currentChooseName } = this.state;
      for (let item of this.props.items) {
        if (item.product_id == detail.product_master_id) {
          Taro.showToast({
            title: '衣袋已存在该商品~~',
            icon: 'none'
          });
          return;
        }
      }

      // 放入购物车
      this.props.dispatch(
        save([
          ...this.props.items,
          {
            brand: detail.brand,
            images: detail.image[0],
            name: detail.name,
            product_id: detail.product_master_id,
            product_price: detail.market_price,
            specification: currentChooseName,
            spu: currentChooseId,
            type: detail.type_id
          }
        ])
      );
      Taro.showToast({
        title: '加入衣袋成功'
      });
    }
  };

  /**
   * 切换选中尺码
   * @param {*} e
   */
  chooseSize = (e) => {
    const { has_stock, id, name } = e.currentTarget.dataset;
    // 只有has_stock=1 才可以选择尺码,其他都是disable
    if (has_stock == 1) {
      // 如果点击当前，则2次点击清空
      if (id == this.state.currentChooseId) {
        this.setState({
          currentChooseId: '',
          currentChooseName: ''
        });
      } else {
        // 首次点击，赋值为当前id
        this.setState({
          currentChooseId: id,
          currentChooseName: name
        });
      }
    }
  };

  /**
   * 跳转页面
   * @param {*} e
   */
  goToPage = (e) => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      Taro.navigateTo({
        url: e.currentTarget.dataset.url
      });
    } else {
      // 小程序内是 tab页面
      Taro.switchTab({
        url: e.currentTarget.dataset.url
      });
    }
  };

  /**
   * 打电话
   */
  makePhoneCall() {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      window.location.href = 'tel:123456';
    } else {
      // 拨打电话
      Taro.makePhoneCall({
        phoneNumber: '123456'
      });
    }
  }

  /**
   * 选中尺码样式 修改
   * @param {*} item
   * @returns
   */
  computedStyle = (item) => {
    let str = '';
    if (item.id == this.state.currentChooseId) {
      str = 'size on';
    } else {
      str = 'size';
    }
    if (item.has_stock != 1) {
      str = 'size off';
    }
    return str;
  };

  render() {
    const { imageObj, detail, currentChooseId, specificationsList } =
      this.state;
    const { items } = this.props;
    return (
      <View className='detail-page'>
        <View className='image-box-wrap'>
          {/* 轮播 */}
          <View className='image-box clearfix'>
            <MySwiper banner={imageObj} />
            {/* 分享 */}
            <View className='share-btn'>
              <Button open-type='share' />
            </View>
          </View>
          {/*  */}
          {detail.mode_id &&
            detail.mode_id == 3 &&
            (detail.enabled != 1 || detail.sale_stock == 0) && (
              <View className='sold-out'>
                <View className='sales-end'>已售罄</View>
              </View>
            )}

          {detail.enabled &&
            detail.enabled != 0 &&
            detail.enabled != 1 &&
            detail.enabled != 2 && (
              <View className='unable'>
                <View className='sales-end'>下架</View>
              </View>
            )}
        </View>
        <View className='container'>
          {/* -- 商品信息 -- */}
          <View className='info-business-card'>
            <View className='name'>{detail.brand}</View>

            <View className='model'>参考价 ¥{detail.market_price}</View>
          </View>
          <View className='product_name'>
            {detail.type_id == 2 && detail.mode_id == 1 && <View>VIP</View>}
            {detail.limit_tag && detail.limit_tag != '' && (
              <View className='zan-capsule__center'>{detail.limit_tag}</View>
            )}
            {detail.name}
          </View>
          <View className='code'>{detail.product_spu}</View>
          <View className='info-size'>
            {specificationsList &&
              specificationsList.length > 0 &&
              specificationsList.map((spe, speIndex) => {
                return (
                  <View key={speIndex}>
                    {spe &&
                      spe.options &&
                      spe.options.map((item, index) => (
                        <View key={index}>
                          {spe.name == '中码' ? (
                            <View
                              className={this.computedStyle(item)}
                              data-has_stock={item.has_stock}
                              data-id={item.id}
                              data-name={item.name}
                              onClick={this.chooseSize}
                            >
                              {item.name == '均码' ? (
                                <View>均码</View>
                              ) : (
                                <View>{`${spe.name}${item.value}号`}</View>
                              )}
                            </View>
                          ) : (
                            <View
                              className={this.computedStyle(item)}
                              data-has_stock={item.has_stock}
                              data-id={item.id}
                              onClick={this.chooseSize}
                            >
                              <View className='double'>
                                {`${spe.name}${item.name}号`}
                              </View>
                              <View className='double font'>
                                {`中码${item.value}号`}
                              </View>
                            </View>
                          )}
                        </View>
                      ))}
                  </View>
                );
              })}
          </View>

          <View className='proudct-size-line' onClick={this.openSize}>
            <View className='clearfix'>
              <View className='icon-tag' />
              <View className='text'>各国尺码转换表</View>
            </View>
          </View>

          {/* 买手点评 */}
          <View>
            {detail.designer_comment && (
              <View className='goods-info'>
                <View className='chapter-head'>买手点评</View>
                <View className='fj'>
                  <Image
                    className='fj-img'
                    src={detail.buyer_Info.avatar}
                    alt=''
                  />
                  <View>
                    <View className='fj-name'>
                      {detail.buyer_Info.nickname}
                    </View>
                    <View className='fj-tag'>女神派时尚买手</View>
                    <View className='fj-info'>{detail.designer_comment}</View>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* 美衣详情  */}

          <View className='goods-info'>
            <View className='chapter-head'>商品详情</View>
            {detail.measurement != '' && (
              <View className='detail-info'>
                <View className='head'>
                  <Image src={require('../../images/icon/icon32.png')} alt='' />
                  平铺测量
                </View>
                {detail.measurement &&
                  detail.measurement.map((item, index) => (
                    <View className='block' key={index}>
                      {item}
                    </View>
                  ))}
              </View>
            )}

            {/*  */}
            {detail.size_suggestion && detail.size_suggestion != null && (
              <View className='detail-info'>
                <View className='head'>
                  <Image alt='' src={require('../../images/icon/icon33.png')} />
                  尺码建议
                </View>
                <View>{detail.size_suggestion}</View>
              </View>
            )}
            {/*  */}
            {detail.fabric && detail.fabric != null && (
              <View className='detail-info'>
                <View className='head'>
                  <Image alt='' src={require('../../images/icon/icon34.png')} />
                  面料成分
                </View>
                {detail.thickness != null && (
                  <View>
                    面料：
                    {detail.fabric}({detail.thickness})
                  </View>
                )}
                {detail.thickness == null && (
                  <View>
                    面料：
                    {detail.fabric}
                  </View>
                )}
              </View>
            )}
          </View>

          {/* 优质评价 */}
          <View className='goods-info'>
            <View className='chapter-head'>
              优质评价（
              {detail.comments && detail.comments.total}）
            </View>
            {detail.comments && detail.comments.total == 0 && (
              <View className='text-center'>———— 暂无优质评价 ————</View>
            )}
            {detail.comments &&
              detail.comments.rows &&
              detail.comments.rows.map((item, index) => (
                <View className='fj' key={index}>
                  <Image className='fj-img' alt='' src={item.user_pic} />
                  <View>
                    <View className='fj-name font26'>{item.nickname}</View>
                    <View className='fj-tag'>{item.fit_text}</View>
                    <View className='fj-info'>{item.comment}</View>
                    <View className='comment-img'>
                      {item.images &&
                        item.images.map((sub1, subIndex1) => (
                          <Image
                            key={subIndex1}
                            className='goods-img'
                            mode='widthFix'
                            src={sub1.image_url}
                          />
                        ))}
                    </View>
                  </View>
                </View>
              ))}
          </View>
          {/* 品牌介绍 */}
          {detail.brand && detail.brand != null && (
            <View className='goods-info'>
              <View className='chapter-head'>品牌介绍</View>
              <View className='introduce'>
                <View className='b'>{detail.brand}</View>
                {/*  <image src="{{detail.brand_logo}}"  alt="" /> */}
                <View className='iconfont icon-more' />
              </View>
              {detail.brand_desc != null && (
                <View className='light'>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {detail.brand_desc}
                </View>
              )}
            </View>
          )}
          {/* 服务说明 */}
          <View className='goods-info'>
            {/* <View className='chapter-head'>
              服务说明
            </View> */}
            {/* <View className='server-ul'>
              <View className='server-list'>
                <Image
                  mode='widthFix'
                  src='http://static-r.msparis.com/uploads/d/6/d646e479e328e9f370462b51fb841e70.png'
                  alt=''
                />
                <View>每次4件</View>
                <View>无限换穿</View>
              </View>
              <View className='server-list'>
                <Image
                  mode='widthFix'
                  src='http://static-r.msparis.com/uploads/1/3/137d9963d13a053a6a81784af1256aa9.png'
                  alt=''
                />
                <View>五星洗护</View>
                <View>往返包邮</View>
              </View>
              <View className='server-list'>
                <Image
                  mode='widthFix'
                  src='http://static-r.msparis.com/uploads/c/0/c0367921e38cc7fd33f63897b18a86ef.png'
                  alt=''
                />
                <View>APP一键还衣</View>
                <View>快递上门</View>
              </View>
            </View> */}
          </View>
        </View>
        {/* 底部操作栏 */}
        <View className='detail-bottom-btns'>
          <View
            className='nav'
            data-url='/pages/home/index'
            onClick={this.goToPage}
          >
            <Image
              className='nav-img'
              src={require('../../images/tab/home.png')}
              alt=''
            />
            首页
          </View>
          <View className='nav' onClick={this.makePhoneCall}>
            <Image
              className='nav-img'
              src={require('../../images/icon/customerservice.png')}
              alt=''
            />
            客服
          </View>
          <View
            className='nav'
            data-url='/pages/cart/index'
            onClick={this.goToPage}
          >
            <Image
              className='nav-img'
              src={require('../../images/tab/cart.png')}
              alt=''
            />
            购物车
            {items.length > 0 && (
              <View className='zan-badge__count'>{items.length}</View>
            )}
          </View>
          <View
            className={currentChooseId == '' ? 'join join-disabled' : 'join'}
            onClick={this.join}
          >
            加入购物车
          </View>
        </View>
      </View>
    );
  }
}
