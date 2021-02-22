const axios = require('axios'),
	express = require('express'),
	app = express(),
	jsdom = require('jsdom'),
	cors = require('cors'),
	{
		JSDOM
	} = jsdom,
	bodyParser = require('body-parser'),
	request = require('request');;
let dom = '';
app.use(cors());
app.use(bodyParser.json())

app.get('/qqq',(req,res)=>{
	res.send(200)
})

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
