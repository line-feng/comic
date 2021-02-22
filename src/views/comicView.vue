<template>
	<div style="width: 100%;" v-for="(item,index) in list" :key='index+item'>
		<img :src="item.imgSrc" style="width: 100%;" />
		<!-- {{ item.imgSrc }} -->
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
					for (let i = 0; i < 5; i++) {
						this.list.push(rel.data.data[i])
					}
					let i = 5
					let time
					time = setInterval(() => {
						// console.log(i,rel.data.data.length)
						if (i == rel.data.data.length - 1) {
							clearInterval(time)
						}
						this.list.push(rel.data.data[i])
						i++
						// console.log(rel.data.data[i])
					}, 1000)

				})
			// console.log(this.comicView)
		},
		mounted() {
			// window.addEventListener("scroll", this.scrollWindow, true);
		},
		beforeUnmount() {
			// window.removeEventListener('scroll', this.scrollWindow, true)
		},
		methods: {

		}
	}
</script>

<style>
</style>
