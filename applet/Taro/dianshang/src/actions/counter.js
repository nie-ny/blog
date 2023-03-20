export const ADD = 'ADD';
export const MINUS = 'MINUS';

export const add = () => {
  return {
    type: ADD
  };
};
export const minus = () => {
  return {
    type: MINUS
  };
};

// 异步的action
export function asyncAdd() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add());
    }, 2000);
  };
}
