<template>
	<div class="container" :style=game_notification_overlay_style>
		<ScoreBar :score=game_percentage />
		<Header />
		<Card v-if="game_state === 'run'" @onClick="onClick" :card=card :answers=answers :highlight=game_highlight />
		<!-- <Options v-if="game_state === 'options'" /> -->
		<Statistics v-if="game_state === 'end'" @onRestart="startGame" :user=user :game_timestamp_start=game_timestamp_start :dictionary=dictionary :deck=deck />
		<Notification :text=game_notification_text @onNotificationOver="game_notification_text = ''" />
	</div>
</template>
<script>
// https://opengameart.org/content/512-sound-effects-8-bit-style
// https://www.bitday.me/
// https://www.behance.net/gallery/26258429/Own-8-bit-character-(Pokemon-Themed)
import fr_en from "@/dict/fr_en.json";

import Deck from '@/utils/Deck';
import Sound from '@/utils/Sound';
import User from '@/utils/User';

import Notification from '@/components/Notification.vue';
import Header from '@/components/Header.vue';
import ScoreBar from '@/components/ScoreBar.vue';
import Statistics from '@/components/Statistics.vue';
import Card from '@/components/Card.vue';

const CARD_COUNT = 8;
const MAX_POINT = 10;

// const USER = "dumdum";
// const PASS = "pw";

// const NOTIFICAITON_PERIOD = 10;









const SCORE_COEFF = 0.7;
const ANSWER_COUNT = 4;

export default {
	name: 'App',
	components: {
		Notification,
		Header,
		Card,
		ScoreBar,
		Statistics,
	},
	data() {
		return {
			user: {},

			dictionary: [],
			deck: [],
			card: {},
			answers: [],

			sound: null,

			game_timestamp_start: 0,
			// game_percentage
			game_notification_text: "",
			game_notification_overlay_style: "",
			game_highlight: false,
			game_state: "run",

			notification_drought: 0,
		}
	},
	computed: {
		game_percentage() {
			// Get all points since the beginning of the game
			let points = [];
			let point = 0;
			let game_percentage = 0;

			for (var i in this.deck.getDeck()) {
				point = this.user.getPoint({
					id: this.deck.getDeck()[i]['id'],
					timestamp_start: this.game_timestamp_start,
				});

				if (point > 0) {
					points.push(point);
				} else {
					points.push(0);
				}
			}

			for (var j in points) {
				game_percentage += (Math.ceil(
					(Math.pow(SCORE_COEFF, points[j]) - 1) /
					(Math.pow(SCORE_COEFF, MAX_POINT) - 1) *
					100)) / 100
			}

			return ((game_percentage / CARD_COUNT) * 100);
		}
	},
	methods: {
		blink(reset = false) {
			let opacity = 0.5;

			if (reset) {
				opacity = 0;
			} else {
				setTimeout(() => {
					this.blink(true);
				}, 75);
			}

			this.game_notification_overlay_style = "background-color: rgba(204, 102, 102, " + opacity + ");"
		},

		// notificationIsNeeded() {
		// 	const streaks = [4, 9, 14, 24, 49];

		// 	if (streaks.indexOf(this.history['streak']) !== -1) {
		// 		return true;
		// 	}

		// 	return false;
		// },

		// showNotification() {
		// 	const streaks = [5, 10, 15, 25, 50];

		// 	if (streaks.indexOf(this.history['streak']) !== -1) {
		// 		this.notification_text = this.history['streak'] + " X";
		// 		this.notification_drought = 0;
		// 		this.sound.assign("notification");

		// 		setTimeout(() => {
		// 			this.hideNotification();
		// 		}, 1500);
		// 	}
		// },

		// hideNotification() {
		// 	this.notification_text = "";
		// },

		onClick(id) {
			// Log event --> update points
			this.user.log({
				id: id,
				correct: (id == this.card['id']),
			});

			if (id != this.card['id']) {
				this.user.log({
					id: this.card['id'],
					correct: (id == this.card['id']),
				});
			}

			// Set sound and animation
			if (id == this.card['id']) {
				this.sound.assign("good");
			} else {
				this.sound.assign("bad");
				this.blink();
			}

			// Check if notification is needed
			this.game_notification_text = this.user.getNotification();
			if (this.game_notification_text) this.sound.assign("notification");

			// Check win
			if (this.game_percentage < 100) {
				// Get fresh card
				this.getCard();
			} else {
				this.sound.assign("win");
				this.game_state = "end";
			}

			// Play sound
			this.sound.play();
		},

		getCard() {
			// Get excluded IDs
			let excluded_ids = [];

			for (var i in this.deck.getDeck()) {
				if (this.user.getPoint({
						id: this.deck.getDeck()[i]['id'],
						timestamp_start: this.game_timestamp_start,
					}) === MAX_POINT) {
					excluded_ids.push(this.deck.getDeck()[i]['id']);
				}
			}

			if ((excluded_ids.length + 1) < this.deck.length) {
				excluded_ids.push(this.user.getLastId({
					timestamp_start: this.game_timestamp_start
				}));
			}

			// Get Card
			this.card = new Deck({
				deck: this.deck.getRandomDeck({
					count: 1,
					excluded_ids: excluded_ids,
				}),
			}).getFirst();

			if (this.user.getPoint({
					id: this.card['id'],
					timestamp_start: this.game_timestamp_start,
				}) <= 0 ) {
				this.game_highlight = true;
			} else {
				this.game_highlight = false;
			}

			// Get Answers
			this.answers = new Deck({
				deck: this.deck.getRandomDeck({
					count: (ANSWER_COUNT - 1),
					excluded_ids: [
						this.card['id'],
					],
				}),
			});
		},

		startGame() {
			// Set game state to run
			this.game_state = "run";
			
			// Create deck
			this.deck = new Deck({
				deck: this.dictionary.getRandomDeck({
					count: CARD_COUNT,
				}),
			});

			// Save timestamp
			this.game_timestamp_start = Date.now();

			// Get the first card
			this.getCard();
		}
	},

	created() {
		// Init sound module
		this.sound = new Sound();

		// Create dictionary
		this.dictionary = new Deck({
			deck: fr_en
		});

		// Create and login user
		this.user = new User();
		// this.user.login({
		// 	email: USER,
		// 	password: PASS,
		// });

		// Start game
		this.startGame();
	},
}
</script>