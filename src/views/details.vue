<template>
	<div>
		<van-image
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
		</div>
	</div>
	<div>
		<van-button v-for="(item,index) in list" :key='index + item' @click="toReadComic(item)">
			{{ item.list_con_zj }}
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
			// console.log()
			if (this.$route.params.title) {
				sessionStorage.deails = JSON.stringify(this.$route.params)
			}
			this.deails = JSON.parse(sessionStorage.deails)

			this.$axios({
					url: '/getDeails',
					method: "post",
					data: this.deails
				})
				.then((rel) => {
					this.list = rel.data.data.listComic
				})

		},
		methods:{
			toReadComic(item){
				let params = {}
				for(let i in item){
					params[i] = item[i]
				}
				params['list'] = JSON.stringify(this.list)
				this.$router.push({
					name:'comicView',
					params:params
				})
			}
		}
	}
</script>

<style>
</style>
