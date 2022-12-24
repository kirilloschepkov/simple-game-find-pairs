/// <reference types="cypress" />

describe('Playing', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5500/index.html');
	});

	function checkGamingAndWinnig(size) {
		cy.get('select').select(String(size));
		cy.contains('Start the game').click();
		for (let i = 1; i <= size ** 2 / 2; i++) {
			cy.get('.game__card')
				.contains(new RegExp(`^${i}$`))
				.first()
				.click();
			cy.get('.game__card')
				.contains(new RegExp(`^${i}$`))
				.last()
				.click();
		}
		cy.get('.win-game').should('be.visible');
	}

	it('Playing with size 2', () => {
		checkGamingAndWinnig(2);
	});

	it('Playing with size 3', () => {
		checkGamingAndWinnig(3); //wrong
	});

	it('Playing with size 4', () => {
		checkGamingAndWinnig(4);
	});

	it('Playing with size 6', () => {
		checkGamingAndWinnig(6);
	});
	it('Playing with size 8', () => {
		checkGamingAndWinnig(8);
	});

	it('Playing with size 10', () => {
		checkGamingAndWinnig(10);
	});
});
