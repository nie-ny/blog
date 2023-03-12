const getOpenId = require('./getOpenId/index')
const getIP = require('./getIP/index')
const getInfoWhere = require('./getInfoWhere/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context)
    case 'getIP':
      return await getIP.main(event, context)
    case 'getInfoWhere':
      return await getInfoWhere.main(event, context)
      
  }
}
