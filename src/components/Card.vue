<template>
	<div class="container">
		<div class="card">
			<p class="cardtitle">{{isFromTo ? card['from'] : card['to']}}</p>
			<div class="container-button">
				<CardButton v-for="(answer, index) in answers.deck" :key="index" :id=answer.id :style="((highlight) && (answer.id === card.id)) ? 'active' : ''" @onClick="onClick">{{isFromTo ? answer.to : answer.from}}</CardButton>
			</div>
		</div>
	</div>
</template>
<script>
import CardButton from '@/components/CardButton.vue';

export default {
	name: 'Card',
	props: {
		card: {
			type: Object,
			default: null,
		},
		answers: {
			type: Object,
			default: null,
		},
		highlight: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			isFromTo: true,
		}
	},
	components: {
		CardButton,
	},
	emits: [
		'onClick',
	],
	watch: {
		answers() {
			this.initCard();
		},
	},
	methods: {
		onClick(id) {
			this.$emit('onClick', id)
		},
		initCard() {
			// Determine language direction
			this.isFromTo = Math.floor(Math.random() * 2);

			// Insert the Card to a random positon
			this.answers.insertCardToRandom({
				card: this.card
			});
		},
	},
	mounted() {
		this.initCard()
	},
}
</script>
<style lang="css" scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	height: 100vh;
}

.card {
	width: 32rem;

	background: rgba(255, 255, 255, 0.5);
}

.cardtitle {
	padding-left: 1.5rem;
	padding-top: 1.5rem;

	font-size: 1.5rem;

	text-transform: lowercase;
}

.container-button {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	padding: 1rem;
}

@media (max-width: 32rem) {
	.card {
		width: min(100vw, 16rem);
	}
}
</style>