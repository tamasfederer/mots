<template>
	<button :class=style @click="$emit('onClick', id)">
		<slot></slot>
	</button>
</template>
<script>
export default {
	name: 'CardButton',
	props: {
		id: {
			type: String,
			default: "",
		},
		style: {
			type: String,
			default: "",
		},
	},
	emits: [
		'onClick'
	],
}
</script>
<style lang="css" scoped>
button {
	width: 14rem;

	padding: 1rem 0rem;
	margin: .5rem;

	text-transform: lowercase;

	border-style: solid;
	border-width: .3rem;
	border-color: black;

	background-color: rgba(153, 153, 153, 0.3);
}

.active {
	color: rgba(0, 102, 0, 1);
	border-color: rgba(0, 102, 0, 1);
	background-color: rgba(0, 204, 0, 0.3);
}

button:focus {
	outline: none;
}

@media (hover: hover) {
	button:hover {
		background: rgba(153, 153, 153, 0.7);

		cursor: pointer;
	}

	.active:hover {
		background: rgba(0, 153, 0, 0.7);
	}
}
</style>