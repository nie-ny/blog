'use strict';
const db = uniCloud.database()
const _ = db.command

exports.main = async (event, context) => {
	const collection = db.collection('bill')

	let whereData = event.whereData || {}

	let tem = {}
	if (event.gt) {
		// gt 大于
		Object.keys(event.gt).forEach(key =>
			tem[key] = _.gt(event.gt[key])
		)
	}

	const res = await collection.where({
			...whereData,
			...tem
		}).orderBy('createTime', 'desc').skip(event.limit ? event.limit * (event.pageNo - 1) : 0)
		.limit(event.limit ? event.limit : 999999).get()
	return res
};
