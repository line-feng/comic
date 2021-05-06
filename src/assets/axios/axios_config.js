import axios from 'axios'
import Qs from 'qs'
// axios.defaults.withCredentials = true
import Vant from 'vant';
console.log(Vant.Toast)
axios.interceptors.request.use(
	config => {
		// //设置请求头
		// config.headers = {
		// 	'Content-type': 'application/x-www-form-urlencoded'
		// };
		// config.data = Qs.stringify(config.data, {
		// 	arrayFormat: 'indices',
		// 	allowDots: true
		// });
		// //防止一些地方没做处理，导致请求数据携带的参数中有中文的‘请选择’字样
		// for (let i in config.params) {
		// 	if (config.params[i] == '请选择') {
		// 		config.params[i] = ''
		// 	}
		// }
		// // 如果是登录页面，只显示加载中的动画
		// if (window.location.href.indexOf('login') == -1) {

		// }
		Vue.prototype.$toast.loading({
			duration: 0, // 持续展示 toast
			forbidClick: true,
			message: '加载中',
		});
		return config
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
);

axios.interceptors.response.use(function(response) {
	//在请求结束后台后关闭加载动画，登录页除外
	Vue.prototype.$toast.clear()
	//根据后台返回的状态码和提示文本，
	// switch (response.data.msgCode) {
	// 	case 302:
	// 		console.log('302')
	// 		promptMsg(response.data.msg)
	// 		break
	// 	case 301:
	// 		promptMsg(response.data.msg)
	// 		break
	// 	case 303:
	// 		promptMsg(response.data.msg)
	// 		break
	// 	case 500:
	// 		console.log('500')
	// 		break
	// 	case 601:
	// 		Vue.prototype.$dialog.alert({
	// 			title: '重新登录',
	// 			message: '会话已失效，请重新登录！',
	// 		}).then(() => {
	// 			location.href = '/login'
	// 		});
	// 		break
	// 	case 602:
	// 		console.log('602')
	// 		break
	// }
	return response
}, function(error) {
	// switch (error.response.status) {
	// 	case 601:
	// 		// Vue.prototype.$dialog.alert({
	// 		// 	title: '重新登录',
	// 		// 	message: '会话已失效，请重新登录！',
	// 		// }).then(() => {
	// 		// 	location.href = '/login'
	// 		// });
	// 		break
	// 	case 602:
	// 		console.log('602')
	// 		break
	// }
	return Promise.reject(error)
})

// function promptMsg(msg, callback = () => {}) {
// 	Vue.prototype.$dialog.alert({
// 		title: '',
// 		message: msg,
// 	}).then(() => {
// 		callback()
// 	});
// }

export default axios
