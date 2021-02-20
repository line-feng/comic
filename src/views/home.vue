<template>
	<div>
		<input v-model="searchValue" /><button @click="toPath('/search')">btn</button>
	</div>
	home
</template>

<script>
	export default{
		data(){
			return{
				searchValue:'隆123'
			}
		},
		methods:{
			toPath(path){
				this.$router.push({
					name:'search',
					params:{
						searchValue:this.searchValue
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">

</style>
