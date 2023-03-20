import Taro from '@tarojs/taro';

export const SAVE = 'cart/save';
export const DELETE_CLOTHES = 'cart/deleteClothes';
export const INIT = 'cart/init';

// 保存购物车数据
export const save = (val) => {
  Taro.setStorageSync('items', val);
  return {
    type: SAVE,
    val: {
      cartItems: val
    }
  };
};

//
export const deleteClothes = (val) => {
  return (dispatch, getState) => {
    // 获取 store 中的下一页参数 和 已查询的列表数据
    const { cartItems = [] } = getState().cart;
    const items = cartItems.filter((item) => item.product_id != val.id);

    // 设置衣袋小红点
    if (items.length > 0) {
      Taro.setStorageSync('items', items);
      Taro.setTabBarBadge({
        index: 1,
        text: String(items.length)
      });
    } else {
      Taro.removeStorageSync('items');
      Taro.removeTabBarBadge({
        index: 1
      });
    }
    dispatch({
      type: DELETE_CLOTHES,
      val: {
        cartItems: items
      }
    });
  };
};

//
export const init = () => {
  return {
    type: INIT
  };
};
