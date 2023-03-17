'use strict';

exports.main = async (event, context) => {
    const res = await uniCloud.httpclient.request(
        'https://api.weixin.qq.com/sns/jscode2session?appid=wx825cee6bc02c8213&secret=a037b07f79e8425007956e08b1a3853d&js_code=' + event
        .code + '&grant_type=authorization_code', {
                dataType: 'json'
        });
    return res;
};