const {
	validationToekn,
	serialize,
	Token,
	getSearch,
	getList,
	downloadImg,
	axios,
	chapterList,
	getomicView,
	micViewList,
	saveImg,
	axiosUtil
} = require('../util/index.js'),
	fs = require('fs');


const routerList = {
	//获取搜索列表保存至mysql以及图片文件
	getComic: (controlTable) => {
		routerList.app.get('/api/getComic', async (req, res) => {
			let title = req.query.searchValue
			let searchHtml = await getSearch(title)
			let comicData = getList(searchHtml)
			comicData.listComic.forEach((item, index) => {
				let url = item.url.split('/')
				url = url[url.length - 2]
				let imgUrl = '/images/' + url + '/' + url + '.jpg'

				// downloadImg(item.imgSrc, url, url)


				controlTable('select title from comicList where title=?', [item.title]).then(result => {
					if (result.length == 0) {
						let addSql = 'INSERT INTO comicList(title,url,imgSrc,author,newPage) VALUES(?,?,?,?,?)';
						let addSqlParams = [item.title, item.url, imgUrl, item.author, item.newPage];
						controlTable(addSql, addSqlParams)
					} else {
						controlTable('update comicList set title=?,url=?,imgSrc=?,author=?,newPage=? where title=?', [item.title,
							item.url, imgUrl, item.author, item.newPage, item.title
						])
					}

					if (index == comicData.listComic.length - 1) {
						controlTable('select comicId,title,url from comicList where title REGEXP  ?', [title]).then(result => {
							for (let i = 0; i < result.length; i++) {
								getDetailsList({
									url: result[i].url,
									title: result[i].title,
									comicId: result[i].comicId
								})

							
							}
						})
					}

				})
			})

			async function getDetailsList(body) {
				let deailsHtml = await axios({
					url: body.url,
					method: 'get'
				})
				let comicData = chapterList(deailsHtml)

				comicData.listComic.splice(comicData.listComic.length - 1, 1)

				comicData.listComic.forEach((item, index) => {
					controlTable(
							'select detailsId,comicId,list_con_zj from comicDetails where comicId=? and list_con_zj=?', [
								body.comicId,
								item.list_con_zj
								.replace(' ', '-')
							])
						.then((result) => {
							if (result.length == 0) {
								let addSql = 'INSERT INTO comicDetails(comicId,url,list_con_zj) VALUES(?,?,?)';
								let addSqlParams = [body.comicId, item.url, item.list_con_zj.replace(' ', '-')];
								controlTable(addSql, addSqlParams)
							} else {
								controlTable('update comicDetails set comicId=?,url=?,list_con_zj=? where list_con_zj=?', [
									body.comicId,
									item.url, item.list_con_zj, item.list_con_zj
								])
							}

							if (index == comicData.listComic.length - 1) {
								controlTable('select comicId,detailsId,url,list_con_zj from comicDetails where comicId=?', [
										body.comicId
									])
									.then(
										(result) => {
											for (let i = 0; i < result.length; i++) {
												getView({
													comicId: result[i].comicId,
													detailsId: result[i].detailsId,
													url: result[i].url,
													list_con_zj: result[i].list_con_zj,
													index: i + 1
												})

											}
										})
							}

						})
				})
			}

			async function getView(body) {
				let params = body

				let list = await getomicView(params.url)
				let forIndex = 0,
					imgArr = [];
				list.forEach((item, index) => {

					axiosUtil({
							url: item,
							method: 'get'
						})
						.then(({
							data
						}) => {
							let {
								imgSrc
							} = micViewList(data)
							imgArr.push({
								url: imgSrc,
								index: index
							})
							forIndex++
							if (forIndex == list.length) {
								for (let i = 0; i < imgArr.length; i++) {
									for (let j = i + 1; j < imgArr.length; j++) {
										if (imgArr[i].index > imgArr[j].index) {
											let temp = imgArr[i]
											imgArr[i] = imgArr[j]
											imgArr[j] = temp
										}
									}
								}
								forIndex = 0
								imgArr.forEach((It, In) => {
									index = params.index + '-' + (forIndex + 1)
									controlTable('select detailsId,comicId from comicImageList where detailsId=? and location=?', [
										params
										.detailsId, params.comicId,
										index
									]).then((result) => {
										forIndex++
										if (result.length == 0) {
											index = params.index + '-' + (In + 1)
											let addSql = 'INSERT INTO comicImageList(detailsId,url,location,comicId) VALUES(?,?,?,?)';
											let addSqlParams = [params.detailsId, It.url, index, params.comicId];
											controlTable(addSql, addSqlParams)
										} else {
											controlTable(
												'update comicImageList set detailsId=?,url=?,location=?,comicId=? where detailsId=? and location=?',
												[
													params
													.detailsId, It.url, index, params.comicId, params.detailsId, index
												])
										}
									})
								})
							}
						})
				})
			}
			res.send('200')
		})
	},

}


module.exports = routerList
