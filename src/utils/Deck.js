export default class Deck {
	constructor({ deck = [] } = {}) {
		this.deck = [];
		
		for (var idx in deck) {
			this.deck.push(deck[idx]);
		}
		this.length = this.deck.length;
	}

	getCardById({ id = 0 } = {}) {
		let card = null;

		for (var i = 0; i < this.length; i++) {
			if (this.deck[i]['id'] == id) {
				card = this.deck[i];
			}
		}

		return card;
	}

	getCardByIdx({ idx = 0 } = {}) {
		return this.deck[idx];
	}

	getFirst() {
		return this.getCardByIdx();
	}

	getDeck() {
		return this.deck;
	}

	getRandomDeck({ count = 1, excluded_ids = [] } = {}) {
		// Create a random array
		var random_order = [];
		var deck = [];

		while (random_order.length < this.length) {
			var idx = Math.floor(Math.random() * this.length);
			if (random_order.indexOf(idx) === -1) {
				if (excluded_ids.indexOf(this.getCardByIdx({ idx: idx })['id']) === -1) {
					random_order.push(idx);
					deck.push(this.getCardByIdx({
						idx: idx,
					}));

					if (deck.length === count) {
						break;
					}
				}
			}
		}

		return deck;
	}

	insertCardToRandom({ card = null } = {}) {
		var rnd = Math.floor(Math.random() * (this.length + 1));

		this.deck.splice(rnd, 0, card);
		this.length = this.deck.length;
	}

	getIdxById({ id = 0 } = {}) {
		let idx = 0;

		for (var i = 0; i < this.length; i++) {
			if (this.deck[i]['id'] == id) {
				idx = i;
			}
		}

		return idx;
	}

	addPointbyId({ id = 0, limit = 0 } = {}) {
		let idx = this.getIdxById({ id: id });

		this.deck[idx]['point'] = (this.deck[idx]['point'] === limit) ? limit : this.deck[idx]['point'] + 1;
	}

	removePointbyId({ id = 0 } = {}) {
		let idx = this.getIdxById({ id: id });

		this.deck[idx]['point'] = (this.deck[idx]['point'] === 0) ? 0 : this.deck[idx]['point'] - 1;
	}
}