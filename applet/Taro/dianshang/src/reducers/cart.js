import Taro from '@tarojs/taro';
import { SAVE, DELETE_CLOTHES, INIT } from '../actions/cart';

const INITIAL_STATE = {
  cartItems: Taro.getStorageSync('items') || []
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        ...action.val
      };
    case DELETE_CLOTHES:
      return {
        ...state,
        ...action.val
      };
    case INIT:
      return {
        ...state,
        ...action.val
      };
    default:
      return state;
  }
}
