// Dummy user JSON
import users from "@/user/users.json";

export default class User {
	constructor({ email = "", password = "" } = {}) {
		this.avatar = "logged_out"
		this.history = [];

		if ((email !== "") && (password !== ""))
			this.login({
				email: email,
				password: password,
			});
	}

	// TODO
	login({ email = "", password = "" } = {}) {
		if (email in users) {
			password = "";
			email = email + password;

			this.login_time = Date.now();
			this.avatar = users[email]['avatar'];
			this.history = users[email]['history'];

			return true;
		}

		return false;
	}

	// TODO
	logout() {

	}

	log({ id = null, correct = false } = {}) {
		if (id === null) return;

		this.history.push({
			timestamp: Date.now(),
			id: id,
			correct: correct,
		});
	}

	getNotification() {
		return "";
	}

	getLastId({ timestamp_start = 0, timestamp_end = 0 } = {}) {
		if (timestamp_end === 0) {
			timestamp_end = Date.now() + 1;
		}

		let id = -1;
		let timestamp = 0;

		for (let i in this.history) {
			if ((this.history[i]['timestamp'] <= timestamp_end) &&
				(this.history[i]['timestamp'] >= timestamp_start) &&
				(this.history[i]['timestamp'] >= timestamp)) {
				timestamp = this.history[i]['timestamp'];
				id = this.history[i]['id'];
			}
		}

		return id;
	}

	getPoint({ id = null, timestamp_start = 0, timestamp_end = 0 } = {}) {
		if (id === null) return 0;

		if (timestamp_end === 0) {
			timestamp_end = Date.now() + 1;
		}

		let point = 0;

		for (let i in this.history) {
			if ((this.history[i]['timestamp'] <= timestamp_end) &&
				(this.history[i]['timestamp'] >= timestamp_start) &&
				(this.history[i]['id'] === id)) {
				if (this.history[i]['correct']) {
					point += 1;
				} else {
					point -= 1;
				}
			}
		}

		return point;
	}

	getPercentage({ id = null, timestamp_start = 0, timestamp_end = 0 } = {}) {
		if (id === null) return 0;

		if (timestamp_end === 0) {
			timestamp_end = Date.now() + 1;
		}

		let pos = 0;
		let neg = 0;

		for (let i in this.history) {
			if ((this.history[i]['timestamp'] <= timestamp_end) &&
				(this.history[i]['timestamp'] >= timestamp_start) &&
				(this.history[i]['id'] === id)) {
				if (this.history[i]['correct']) {
					pos += 1;
				} else {
					neg += 1;
				}
			}
		}

		if ((pos + neg) === 0) return 0;

		return (pos / (pos + neg)) * 100;
	}
}