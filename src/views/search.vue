<template>
	<div>
		<van-swipe-cell v-for="(item,index) in list" :key='item + index' @click="toDetails(item)">
			<!-- {{ item.imgSrc }} -->
		 <van-card
		    :desc="item.newPage"
		    :title="item.title"
		    class="goods-card"
		    :thumb="item.imgSrc"
		  />
		  <template #right>
		    <van-button square text="删除" type="danger" class="delete-button" />
		  </template>
		</van-swipe-cell>
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
			this.$toast.loading({
			  message: '加载中...',
			  forbidClick: true,
			  loadingType: 'spinner',
			});
			this.$axios({
					url: '/api/getSearch',
					method: "post",
					data: {
						searchValue: this.searchValue
					}
				})
				.then((rel) => {
					this.list = rel.data.data.listComic
					this.$toast.clear()
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
