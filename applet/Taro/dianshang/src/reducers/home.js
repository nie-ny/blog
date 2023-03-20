import { LOAD, PRODUCT, SAVE } from '../actions/home';

const INITIAL_STATE = {
  banner: [],
  brands: [],
  products_list: [],
  page: 1
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        ...action.val
      };
    case PRODUCT:
      return {
        ...state,
        ...action.val
      };
    case SAVE:
      return {
        ...state,
        ...action.val
      };
    default:
      return state;
  }
}
