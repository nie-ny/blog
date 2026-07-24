import axios from 'axios';

export const INFO = "user/INFO";
// 异步修改 store 的 state 
// connect函数 中的第二个参数需要的值
export function getUser() {
    return dispatch => {
        axios.get('/api/users').then((res)=>{
            let data = JSON.parse(res.request.responseText);
            dispatch({
                type: INFO,
                payload: data
            });
        })
    }
}