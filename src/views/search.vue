<template>
	<div>
		<div @click="toDetails(item)" v-for="(item,index) in list" :key='item + index' style="display: flex;padding: 10px;">
			<van-image
			  width="100"
			  height="100"
			  :src="item.imgSrc"
			/>
			<div>
				<div>
					{{ item.title }}
				</div>
				<div>
					{{ item.newPage }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				list: ''
			}
		},
		created() {
			if (this.$route.params.searchValue) {
				sessionStorage.searchValue = this.$route.params.searchValue
			}
			this.searchValue = sessionStorage.searchValue
			this.$axios({
					url: '/getSearch',
					method: "post",
					data: {
						searchValue: this.searchValue
					}
				})
				.then((rel) => {
					this.list = rel.data.data.listComic
				})
		},
		methods:{
			toDetails(item){
				let params = {}
				for(let i in item){
					params[i] = item[i]
				}
				// return
				this.$router.push({
					name:'details',
					params:params
				})
			}
		}
	}
</script>

<style>
</style>
