<template>
	<div>
		<!-- {{ deails.imgSrc }} -->
<!-- 		<van-image
		  width="100%"
		  height="100%"
		  :src="deails.imgSrc"
		/>
		<div>
			{{ deails.title }}
		</div>
		<div>
			{{ deails.newPage }}
		</div>
		<div>
			{{ deails.author }}
		</div> -->
	</div>
	<div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
		<van-button style='flex: 1;' v-for="(item,index) in list" :key='index + item' @click="toReadComic(item,index)">
			{{item.list_con_zj}}
		</van-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				deails: {},
				list: []
			}
		},
		created() {
			if (this.$route.params.title) {
				sessionStorage.deails = JSON.stringify(this.$route.params)
			}
			this.deails = JSON.parse(sessionStorage.deails)

			if (sessionStorage.list) {
				this.list = JSON.parse(sessionStorage.list)
				return
			}
			this.$toast.loading({
			  message: '加载中...',
			  forbidClick: true,
			  loadingType: 'spinner',
			});
			this.$axios({
					url: '/api/getDeails',
					method: "post",
					data: this.deails
				})
				.then((rel) => {
					this.list = rel.data.data.listComic
					this.list.splice(this.list.length - 1, 1)
					this.$toast.clear()
				})

		},
		methods: {
			toReadComic(item, index) {
				let params = {}
				params['index'] = index
				params['list'] = JSON.stringify(this.list)

				sessionStorage.list = JSON.stringify(this.list)
				sessionStorage.index = index

				this.$router.push({
					name: 'comicView',
					params: params
				})
			}
		}
	}
</script>

<style>
</style>
