<template>
	<div style="width: 99%;height: 100%;overflow: hidden;" v-for="(item,index) in list" :key='index+item'>
		<img :src="item.imgSrc" style="width: 100%;height: 100%;" />
		<!-- {{item.imgSrc}} -->
	</div>

</template>

<script>
	export default {
		data() {
			return {
				comicView: {},
				list: [],
				len: ''
			}
		},
		created() {
			if (this.$route.params.list) {
				let list = this.$route.params['list'],
					index = this.$route.params['index'];

				sessionStorage.comicView = JSON.stringify(JSON.parse(list)[index])
			}
			this.comicView = JSON.parse(sessionStorage.comicView)
			this.getView(this.comicView)
		},
		mounted() {
			window.addEventListener("scroll", this.scrollWindow, true);
		},
		beforeUnmount() {
			window.removeEventListener('scroll', this.scrollWindow, true)
		},
		methods: {
			scrollWindow() {
				let el = document.documentElement
				//判断是否滚动到底部
				if (el.scrollTop + el.clientHeight == el.scrollHeight) {
					// console.log('底部')
					let index = parseInt(sessionStorage.index) + 1,
						list = JSON.parse(sessionStorage.list);
					this.getView(list[index], () => {
						sessionStorage.index = index
					})

				}
			},
			getView(comicView, callback) {
				if (this.len === 0) return
				this.$toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  loadingType: 'spinner',
				});
				this.$axios({
						url: '/api/getomicView',
						method: "post",
						data: comicView
					})
					.then((rel) => {
						this.$toast.clear()
						// this.list = rel.data.data
						for (let i = 0; i < rel.data.data.length; i++) {
							this.list.push(rel.data.data[i])
						}
						this.len = rel.data.data.length
						if (callback) {
							callback()
						}
					})
			}
		}
	}
</script>

<style>
</style>
