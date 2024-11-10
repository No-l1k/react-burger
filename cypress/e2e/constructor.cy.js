describe('Логика главной страницы', () => {
	beforeEach(() => {
		cy.visit("http://localhost:8080/");
		cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
	});

	it('DND конструктора', () => {
		cy.wait('@getIngredients');

		const dataTransfer = new DataTransfer();

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').as('bun');
		cy.get('@bun').trigger('dragstart', { dataTransfer });
		cy.get('[data-testid="constructor-drop-area"]').trigger('drop', { dataTransfer });

		cy.get('[data-testid="constructor-drop-area"]').within(() => {
			cy.contains('Краторная булка N-200i (верх)').should('exist');
			cy.contains('Краторная булка N-200i (низ)').should('exist');
		});

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0942"]').as('sauce');
		cy.get('@sauce').trigger('dragstart', { dataTransfer });
		cy.get('[data-testid="constructor-drop-area"]').trigger('drop', { dataTransfer });

		cy.get('[data-testid="constructor-drop-area"]').should('contain', 'Соус Spicy-X');

		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]').as('main');
		cy.get('@main').trigger('dragstart', { dataTransfer });
		cy.get('[data-testid="constructor-drop-area"]').trigger('drop', { dataTransfer });

		cy.get('[data-testid="constructor-drop-area"]').should('contain', 'Биокотлета из марсианской Магнолии');
	});

	it('Открытие модального окна с описанием ингредиента', () => {
		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').trigger('click');
		cy.location('pathname').should('eq', '/ingredients/643d69a5c3f7b9001cfa093c');
		cy.get('[data-testid="modal"]').should('exist');
	});


	it('Отображение в модальном окне данных ингредиента и закрытие окна', () => {
		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').trigger('click');
		cy.location('pathname').should('eq', '/ingredients/643d69a5c3f7b9001cfa093c');

		cy.get('[data-testid="ingredient-details"]').as('ingredientDetails');
		cy.get('@ingredientDetails')
			.find('[data-testid="ingredient-details-image"]')
			.should('have.attr', 'src')
			.and('match', /https:\/\/code\.s3\.yandex\.net\/react\/code\/bun-02[a-zA-Z|-]*\.png/);

		cy.get('@ingredientDetails')
			.find('[data-testid="ingredient-details-name"]')
			.should('have.text', 'Краторная булка N-200i');

		cy.get('@ingredientDetails')
			.find('[data-testid="ingredient-details-calories"]')
			.should('have.text', '420');

		cy.get('@ingredientDetails')
			.find('[data-testid="ingredient-details-proteins"]')
			.should('have.text', '80');

		cy.get('@ingredientDetails')
			.find('[data-testid="ingredient-details-fat"]')
			.should('have.text', '24');

		cy.get('@ingredientDetails')
			.find('[data-testid="ingredient-details-carbohydrates"]')
			.should('have.text', '53');

		cy.get('[data-testid="close_modal_button"]').trigger('click');
		cy.get('[data-testid="modal"]').should('not.exist');
	});


	it('Закрытие модального окна на Esc', () => {
		cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').trigger('click');
		cy.location('pathname').should('eq', '/ingredients/643d69a5c3f7b9001cfa093c');
		cy.get('[data-testid="modal"]').should('exist');
		
		cy.get('body').type('{esc}')
	
		cy.get('[data-testid="modal"]').should('not.exist');
	});
});