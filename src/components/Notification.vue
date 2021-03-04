<template>
	<div v-if="text" class="notification">{{text}}</div>
</template>
<script>
export default {
	name: 'Notification',
	props: {
		text: {
			type: String,
			default: "",
		}
	},
	data() {
		return {
			message: "",
		}
	},
	emits: [
		'onNotificationOver',
	],
	watch: {
		text() {
			if (this.text) {
				setTimeout(() => {
					this.$emit('onNotificationOver');
				}, 1500);
			}
		}
	}
}
</script>
<style lang="css" scoped>
.notification {
	position: fixed;

	top: 1rem;

	line-height: 1.5rem;
	text-align: center;

	padding: 1rem .5rem;

	width: 16rem;

	margin-left: 50vw;
	transform: translateX(-8.75rem);

	background-color: rgba(255, 255, 51, 1);

	border-style: solid;
	border-width: 0.25rem;

	z-index: 1000;
}
</style>