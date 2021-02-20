const axios = require('axios'),
	express = require('express'),
	app = express(),
	jsdom = require('jsdom'),
	cors = require('cors'),
	{
		JSDOM
	} = jsdom,
	bodyParser = require('body-parser');
let dom = '';
app.use(cors());
app.use(bodyParser.json())

app.post('/getSearch', async (req, res) => {
	let searchHtml = await getSearch(req.body.searchValue)
	let comicData = getList(searchHtml)
	res.send({
		code:200,
		data:comicData
	})
})

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
		comicData.listComic.push(item.innerHTML)
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

// chapter-list-1





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
