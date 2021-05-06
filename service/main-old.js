const axios = require('axios'),
	express = require('express'),
	app = express(),
	jsdom = require('jsdom'),
	cors = require('cors'),
	{
		JSDOM
	} = jsdom,
	bodyParser = require('body-parser'),
	request = require('request');
let dom = '';

app.use(cors())
app.use(bodyParser.json())

app.post('/api/getSearch', async (req, res) => {
	// console.log(req.body.searchValue)
	let searchHtml = await getSearch(req.body.searchValue)
	let comicData = getList(searchHtml)
	res.send({
		code: 200,
		data: comicData
	})
})

app.post('/api/getDeails', async (req, res) => {
	// console.log(req.body.url)
	// return
	let deailsHtml = await getDeails(req.body.url)
	// console.log(deailsHtml)
	// return
	let comicData = chapterList(deailsHtml)
	// console.log(comicData)
	res.send({
		code: 200,
		data: comicData
	})
})

app.post('/api/getomicView', async (req, res) => {
	if (!req.body.url) {
		res.send({
			code: 200,
			data: []
		})
		return
	}
	let html = await getomicView(req.body.url)

	dom = new JSDOM(html);
	let contPage = dom.window.document.querySelector(".image-content p:last-child").textContent.split('/')
	let imgList = []
	contPage = contPage[1]

	for (let i = 0; i < contPage; i++) {
		let arr = req.body.url.split('.')
		if (i != 0) {
			arr[arr.length - 2] = arr[arr.length - 2] + '-' + (i + 1)
		}
		let omicViewHtml = await getomicView(arr.join('.'))
		imgList.push(micViewList(omicViewHtml))
		if (i == contPage - 1) {
			// console.log(imgList)
			res.send({
				code: 200,
				data: imgList
			})
		}
	}
	// return
	// let omicViewHtml = await getomicView(req.body.url)
	// let comicData = micViewList(omicViewHtml, req.body.url)

})

//获取漫画
async function getomicView(url) {
	let data = await axios({
		url: url,
		method: 'get',
	})
	// console.log(data.data)
	return data.data
}

//获取详情内容
async function getDeails(url) {
	let data = await axios({
		url: url,
		method: 'get'
	})
	return data.data
}

//获取章节
function chapterList(html) {
	// chapter-list-1
	let comicData = {
		listNum: '',
		listComic: []
	}
	dom = new JSDOM(html);
	let listComic = dom.window.document.querySelectorAll("#chapter-list-1 li")
	listComic.forEach((item) => {
		let listData = {}
		let listDom = new JSDOM(item.innerHTML);
		listData.url = listDom.window.document.querySelector("a").getAttribute('href')
		listData.list_con_zj = listDom.window.document.querySelector("a span").textContent
		// console.log(item.innerHTML)
		comicData.listComic.push(listData)
	})
	return comicData
}

//获取漫画视图
function micViewList(html, url) {
	let comicData = {
		listNum: '',
		listComic: []
	}
	let listData = {}
	dom = new JSDOM(html);
	listData.imgSrc = dom.window.document.querySelector("#manga-image").getAttribute('src')
	return listData
}

//获取搜索内容
async function getSearch(searchValue) {
	let data = await axios({
		url: 'https://qianwee.com/search/?keywords=' + encodeURIComponent(searchValue),
		method: 'get'
	})
	return data.data
}

//获取列表内容
function getList(html) {
	let comicData = {
		listNum: '',
		listComic: []
	}
	dom = new JSDOM(html);
	// 获取列表
	comicData.listNum = dom.window.document.querySelector(".comi_num .c_6").textContent //数量
	let listComic = dom.window.document.querySelectorAll(".list-comic") //获取总列表
	listComic.forEach((item) => {
		let listData = {}
		let listDom = new JSDOM(item.innerHTML);
		listData.url = listDom.window.document.querySelector("a").getAttribute('href')
		listData.url = listData.url.replace('www.', 'm.')
		listData.title = listDom.window.document.querySelector("a").getAttribute('title')
		listData.imgSrc = listDom.window.document.querySelector("img").getAttribute('src')
		listData.author = listDom.window.document.querySelector(".auth").textContent
		listData.newPage = listDom.window.document.querySelector(".newPage").textContent
		comicData.listComic.push(listData)
	})

	return comicData
	// getChapterList()
	// manhua
}

// function getChapterList(){
// 	let pcUrl = dom.window.document.querySelector(".list-comic a").href
// 	let mobileUrl =  pcUrl.replace('www.qianwee','m.qianwee')
// 	console.log(mobileUrl)
// }

// // chapter-list-1





// console.log('https://qianwee.com/search/?keywords=' + encodeURIComponent('隆'))

app.listen(5555, () => {
	console.log('localhost:5555')
})


























// console.log(encodeURIComponent('元龙'))
// https://m.qianwee.com/search/?keywords=%E7%BB%A7%E6%AF%8D%E7%9A%84%E6%8B%96%E6%B2%B9%E7%93%B6 //移动端
// https://qianwee.com/search/?keywords=%E7%BB%A7%E6%AF%8D%E7%9A%84%E6%8B%96%E6%B2%B9%E7%93%B6 //pc端  
//移动端图片加载速度更快，列表后台检测无法获取 可通过pc端获取搜索列表数据  移动端获取图片资源
//keywords为搜索的名字 
// 名字为拼音（全小写全拼）
// https://m.qianwee.com/manhua/jimudetuoyoupingshiwodeqiannvyou/434718.html
