export default class {
	constructor(container, cardNumber, flip) {
		this.flip = flip;
		this.cardElement = this.createElement(container);
		this.cardNumber = cardNumber;
	}

	_open = false;
	_success = false;

	createElement(container) {
		let card = document.createElement('div');
		card.classList.add('game__card');

		card.addEventListener('click', () => {
			this.flip(this);
		});

		container.append(card);
		return card;
	}

	set cardNumber(value) {
		this._cardNumber = value;
		this.cardElement.textContent = value;
	}

	get cardNumber() {
		return this._cardNumber;
	}

	set open(value) {
		this._open = value;
		if (value) this.cardElement.classList.add('game__card--open');
		else
			setTimeout(() => {
				this.cardElement.classList.remove('game__card--open');
			}, 1000);
	}

	get open() {
		return this._open;
	}

	set success(value) {
		if (value) {
			this._success = value;
			this.cardElement.classList.add('game__card--success');
		}
	}

	get success() {
		return this._success;
	}
}
