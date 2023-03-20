import { combineReducers } from 'redux';
import counter from './counter';
import home from './home';
import cart from './cart';

export default combineReducers({
  counter,
  home,
  cart
});
