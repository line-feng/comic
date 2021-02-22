<template>
	<div style="width: 100%;" v-for="(item,index) in list" :key='index+item'>
		<img :src="item.imgSrc" style="width: 100%;" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				comicView: {},
				list: []
			}
		},
		created() {
			if (this.$route.params.url) {
				sessionStorage.comicView = JSON.stringify(this.$route.params)
			}
			this.comicView = JSON.parse(sessionStorage.comicView)
			this.$axios({
					url: '/getomicView',
					method: "post",
					data: this.comicView
				})
				.then((rel) => {
					// this.list = rel.data.data
					let i = 0
					let time
					time = setInterval(() => {
						// console.log(i,rel.data.data.length)
						if (i == rel.data.data.length - 1) {
                             clearInterval(time)
						}
						this.list.push(rel.data.data[i])
						i++
						console.log(rel.data.data[i])
					}, 1000)

				})
			// console.log(this.comicView)
		},
		methods: {

		}
	}
</script>

<style>
</style>
