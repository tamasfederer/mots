<template>
	<div class="scorecontainer">
		<div class="scorebar" :style="{'width':scorebar_width}" />
		<div class="scoretext" :style="{'filter':scoretext_blur}">{{scoretext_score}}</div>
	</div>
</template>
<script>
const ANIMATION_DURATION_MS = 250;
const ANIMATION_STEPS = 10;

const ANIMATION_BLUR_LEVEL = 0.1;

export default {
	name: 'ScoreBar',
	props: {
		score: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			score_actual: 0,

			scorebar_width: "0vw",
			scoretext_score: "0 %",
			scoretext_blur: "blur(0)",

			animation_step_ms: (ANIMATION_DURATION_MS / ANIMATION_STEPS),
			animation_step_pts: 0,
			animation_is_count_up: true,
		}
	},
	watch: {
		score() {
			// Set score endpoints
			this.animationIsCountUp();

			// Set animation step
			this.setAnimationStepPts();

			// Set scorebar width
			this.setScorebarWidth();

			// Animate text
			this.animateText();
		}
	},
	methods: {
		animationIsCountUp() {
			this.animation_is_count_up = (this.score > this.score_actual);
		},

		setAnimationStepPts() {
			let score_difference = (this.score - this.score_actual);

			this.animation_step_pts = (score_difference / ANIMATION_STEPS);
		},

		setScorebarWidth() {
			this.scorebar_width = this.score + "vw";
		},

		setScoretextScore() {
			this.scoretext_score = this.score_actual.toFixed(2) + " %";
		},

		setScoretextBlur(isBlurred = false) {
			let blur_level = isBlurred ? ANIMATION_BLUR_LEVEL : 0;

			this.scoretext_blur = "blur(" + blur_level + "rem)";
		},

		animateText() {
			this.score_actual += this.animation_step_pts;

			let is_ongoing = (
				(this.animation_is_count_up) &&
				(this.score_actual < this.score)
			) || (
				(!(this.animation_is_count_up)) &&
				(this.score_actual > this.score)
			);

			if (is_ongoing) {
				this.setScoretextBlur(true);

				setTimeout(() => {
					this.animateText();
				}, this.animation_step_ms);
			} else {
				this.setScoretextBlur(false);
				this.score_actual = this.score;
			}

			this.setScoretextScore();
		}
	},
}
</script>
<style lang="css" scoped>
.scorecontainer {
	position: fixed;

	top: 0;
	left: 0;

	height: 2rem;
	width: 100vw;

	background-color: rgba(255, 255, 255, 0.5);
}

.scorebar {
	position: fixed;

	top: 0;
	left: 0;

	height: 2rem;
	width: 50vw;

	z-index: 100;

	background-color: rgba(0, 153, 255, 0.5);

	transition: 1000ms;
}

.scoretext {
	position: fixed;

	top: 0;
	left: 0;

	width: 100vw;

	z-index: 101;

	text-align: center;

	line-height: 2rem;
}
</style>