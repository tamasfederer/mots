export default class Sound {
	constructor() {
		this.file = "";
	}

	assign(file = "") {
		this.file = file;
	}

	play() {
		if (this.file === "") return;

		var audio = new Audio(require("@/assets/sound/" + this.file + ".wav"))
		audio.play();

		this.assign();
	}
}