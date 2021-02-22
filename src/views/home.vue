<template>
	<div>
		<!-- <input v-model="searchValue" /><button @click="toPath('/search')">btn</button> -->
		<van-search v-model="searchValue" show-action placeholder="请输入搜索关键词">
			<template #action>
			    <div @click="onSearch">搜索</div>
			  </template>
		</van-search>
	</div>
	<div style="text-align: center;">
		推荐暂无
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: ''
			}
		},
		methods: {
			onSearch(){
				if(this.searchValue == ''){
					this.$dialog({
					  message: '搜索内容不能为空！',
					}).then(() => {
					  // on close
					});
					return
				}
				this.toPath('/search')
			},
			toPath(path) {
				this.$router.push({
					name: 'search',
					params: {
						searchValue: this.searchValue
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">

</style>
