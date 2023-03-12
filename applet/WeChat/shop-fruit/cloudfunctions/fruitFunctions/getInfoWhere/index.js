// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    const data = await db.collection(event.setName).where(event.ruleObj).get()
    return data
  }   catch (err) {
    return err
  }
}


