<template>
	<div class="statcontainer">
		<div class="stat">
			<div class="deck">
				<div v-for="(result, index) in results" :key="index" class="card" :style=result.style>{{result.text}}</div>
				<button @click="$emit('onRestart')">RESTART</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Statistics',
	props: {
		user: {
			type: Object,
			default: null,
		},
		dictionary: {
			type: Object,
			default: null,
		},
		deck: {
			type: Object,
			default: null,
		},
		game_timestamp_start: {
			type: Number,
			default: 0,
		}
	},
	data() {
		return {

		}
	},
	computed: {
		results() {
			let results = [];
			let percentage = 0;

			for (var i in this.deck.getDeck()) {
				// results.push(this.dictionary.getCardById(
				// 	this.deck.getDeck()[i]['id']
				// 	)['from'])

				percentage = this.user.getPercentage({
					id: this.deck.getDeck()[i]['id'],
					timestap_start: this.game_timestamp_start,
				});

				results.push({
					text: this.deck.getDeck()[i]['from'],
					style: "background: linear-gradient(to right,rgba(0, 204, 0, 0.3) 0%, rgba(0, 204, 0, 0.3) " + percentage + "%,rgba(0, 0, 0, 0) " + percentage + "%, rgba(0, 0, 0, 0) 100%);",
				})
			}

			return results;
		}
	},
	emits: [
		'onRestart'
	],
}
</script>
<style lang="css" scoped>
.statcontainer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	height: 100vh;
}

.deck {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	width: 32rem;
	padding: .5rem 0.5rem;

	background: rgba(255, 255, 255, 0.5);

	position: relative;
}

.card {
	font-size: .75rem;
	background-color: red;

	margin: .5rem .5rem;
	padding-left: 1rem;

	width: 14rem;
	height: 2rem;
	line-height: 2rem;
}

button {
	text-transform: uppercase;

	padding: 1rem;
	margin: 0.5rem;

	border-style: solid;
	border-width: .3rem;
	border-color: black;

	background-color: rgba(153, 153, 153, 0.3);
}

@media (max-width: 32rem) {
	.deck {
		width: min(100vw, 16rem);
	}
}

button:focus {
	outline: none;
}

@media (hover: hover) {
	button:hover {
		background: rgba(153, 153, 153, 0.7);

		cursor: pointer;
	}
}
</style>