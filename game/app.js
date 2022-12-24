import Card from './Card.js';
import { el, setChildren } from '../node_modules/redom/dist/redom.es.js';

function random_number(limit) {
	return Math.round(Math.random() * limit - 0.5);
}

function checkRepeats(tabs) {
	if (tabs[0].cardElement.textContent !== tabs[1].cardElement.textContent) tabs.forEach((e) => (e.open = false));
	else tabs.forEach((e) => (e.success = true));
}

function createWinGameBlock() {
	const section = el('section', { class: 'win-game' }),
		container = el('div', { class: 'win-game__container' }),
		title = el('h2', { class: 'win-game__title' }, 'Congratulations, you have won.'),
		question = el('p', { class: 'win-game__question' }, 'Do you want to play again?'),
		wrapperButtons = el('.win-game__wrapper-btn'),
		btnApproval = el('button', { class: 'win-game__btn' }, 'Yes, I want to play.'),
		btnDisapporoval = el('button', { class: 'win-game__btn' }, 'No, I want to get out.');

	btnApproval.addEventListener('click', showNewGame);

	btnDisapporoval.addEventListener('click', () => {
		setChildren(insertBlock, '');
	});

	setChildren(wrapperButtons, [btnApproval, btnDisapporoval]);
	setChildren(container, [title, question, wrapperButtons]);
	setChildren(section, container);
	return section;
}

function win() {
	setChildren(insertBlock, createWinGameBlock());
}

function createGameAreaBlock(count) {
	const section = el('section', { class: 'game' }),
		gameArea = el('.game__container');

	gameArea.style = `
            grid-template-columns: repeat(${count}, 1fr);
            grid-template-rows: repeat(${count}, 1fr);
            gap: ${count >= 8 ? 10 : 20}px;
        `;

	setChildren(section, gameArea);
	return [gameArea, section];
}

function startGame(count) {
	const [gameAreaBlock, gameAreaSection] = createGameAreaBlock(count);
	setChildren(insertBlock, gameAreaSection);

	const allСards = [],
		cardsNumberArray = [];

	for (let i = 1; i <= count ** 2 / 2; i++) cardsNumberArray.push(i, i);

	for (let i = 0; i < count ** 2; i++) {
		const card = new Card(
			gameAreaBlock,
			cardsNumberArray.splice(random_number(cardsNumberArray.length), 1)[0],
			function (card) {
				if (!card.open && !card.success) {
					card.open = true;

					let activeCards = allСards.filter((e) => e.open && !e.success);
					if (activeCards.length === 2) checkRepeats(activeCards);

					if (allСards.filter((e) => e.success).length === count ** 2) setTimeout(win, 1000);
				}
			}
		);
		allСards.push(card);
	}
}

function createNewGameBlock() {
	const section = el('section', { class: 'new-game' }),
		container = el('div', { class: 'new-game__container' }),
		form = el('form', { class: 'new-game__form form' }),
		title = el('h2', { class: 'form__title' }, 'Start of the game in "find pairs"'),
		question = el('div', { class: 'form__question' }),
		descr = el('p', { class: 'form__descr' }, 'Select the field size:'),
		select = el('select', { class: 'form__select', name: 'size' }, [
			el('option', { value: 2 }, 2),
			el('option', { value: 4 }, 4),
			el('option', { value: 6 }, 6),
			el('option', { value: 8 }, 8),
			el('option', { value: 10 }, 10),
		]),
		button = el('button', { class: 'form__btn' }, 'Start the game');

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		startGame(select.value);
	});

	setChildren(question, [descr, select]);
	setChildren(form, [title, question, button]);
	setChildren(container, form);
	setChildren(section, container);
	return section;
}

function showNewGame() {
	setChildren(insertBlock, newGameBlock);
}

function onloadStyle(src) {
	document.head.append(
		el('link', {
			href: src,
			rel: 'stylesheet',
		})
	);
}

const newGameBlock = createNewGameBlock();
let insertBlock;

export default (insertSelector) => {
	insertBlock = document.querySelector(insertSelector);
	onloadStyle('./game/style.css');
	showNewGame();
};
