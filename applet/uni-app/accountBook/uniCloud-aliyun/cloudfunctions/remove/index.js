'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('bill')
	const docList = await collection.limit(1).get()
	if (!docList.data || docList.data.length === 0) {
		return {
			status: -1,
			msg: '集合bill内没有数据'
		}
	}
	const res = await collection.doc(docList.data[0]._id).remove()
	if (res.deleted === 1) {
		return {
			status: 0,
			msg: '成功删除bill的一条数据'
		}
	} else {
		return {
			status: -2,
			msg: '删除数据失败'
		}
	}
};
