<template>
	<div>
		<div v-for="(item,index) in list" :key='item + index'>
			{{ index }}
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
		}
	}
</script>

<style>
</style>
