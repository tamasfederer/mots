<template>
	<div class="header">
		<!-- <div class="title">{{title}}</div> -->
	</div>
</template>
<script>
export default {
	name: 'Header',
	data() {
		return {
			title: "1000 mots",
		}
	},
}
</script>
<style lang="css" scoped>
.header {
	position: fixed;

	top: 2rem;
	left: 0;

	width: 100vw;
	height: 4rem;
}

.title {
	line-height: 4rem;
	text-align: center;

	font-size: 2rem;
}
</style>