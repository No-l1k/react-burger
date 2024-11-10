import constructorReducer, {
    setBun,
    setIngredients,
    addIngredient,
    removeIngredient,
    moveIngredient,
    initialState,
} from './constructor-slice';

import { IngredientType } from '../utils/types';

describe('burgerConstructor slice', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, { type: "" })).toEqual(initialState);
    });

    describe('setBun', () => {
        it('should set the bun', () => {
            const bun: IngredientType = {
                _id: '1',
                name: 'Bun',
                type: 'bun', 
                price: 10,
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 100,
                image: 'bun_image_url',
            };
            const state = constructorReducer(initialState, setBun(bun));
            expect(state.bun).toEqual(bun);
        });
    });

    describe('setIngredients', () => {
        it('should set the ingredients', () => {
            const ingredients: IngredientType[] = [
                {
                    _id: '2',
                    name: 'Lettuce',
                    type: 'main', 
                    price: 2,
                    proteins: 1,
                    fat: 0,
                    carbohydrates: 2,
                    calories: 10,
                    image: 'lettuce_image_url', 
                },
                {
                    _id: '3',
                    name: 'Cheese',
                    type: 'main', 
                    price: 5,
                    proteins: 3,
                    fat: 4,
                    carbohydrates: 1,
                    calories: 40,
                    image: 'cheese_image_url', 
                },
            ];

            const state = constructorReducer(initialState, setIngredients(ingredients));
            expect(state.ingredients.length).toBe(2);
            expect(state.ingredients[0].id).toBeDefined(); 
            expect(state.ingredients[0].quantity).toBe(1); 
        });
    });

    describe('addIngredient', () => {
        it('should add an ingredient to the list', () => {
            const ingredient: IngredientType = {
                _id: '4',
                name: 'Tomato',
                type: 'main',
                price: 3,
                proteins: 1,
                fat: 0,
                carbohydrates: 2,
                calories: 15,
                image: 'tomato_image_url', 
            };
            const state = constructorReducer(initialState, addIngredient(ingredient));
            expect(state.ingredients.length).toBe(1);
            expect(state.ingredients[0].name).toBe('Tomato');
            expect(state.ingredients[0].quantity).toBe(1);
        });
    });

    describe('removeIngredient', () => {
        it('should remove an ingredient if quantity is 1', () => {
            const ingredient: IngredientType = {
                _id: '5',
                name: 'Onion',
                type: 'main', 
                price: 2,
                proteins: 1,
                fat: 0,
                carbohydrates: 1,
                calories: 5,
                image: 'onion_image_url', 
            };
            const initialStateWithIngredient = constructorReducer(initialState, addIngredient(ingredient));

            const state = constructorReducer(initialStateWithIngredient, removeIngredient(initialStateWithIngredient.ingredients[0].id));
            expect(state.ingredients.length).toBe(0);
        });

        it('should decrease quantity if more than 1', () => {
            const ingredient: IngredientType = {
                _id: '6',
                name: 'Pickle',
                type: 'main', 
                price: 1,
                proteins: 1,
                fat: 0,
                carbohydrates: 1,
                calories: 5,
                image: 'pickle_image_url',
            };
            
            const initialStateWithIngredient = constructorReducer(initialState, addIngredient(ingredient));
            const stateAfterAdd = constructorReducer(initialStateWithIngredient, addIngredient(ingredient));
        
            const stateAfterFirstRemove = constructorReducer(stateAfterAdd, removeIngredient(stateAfterAdd.ingredients[0].id));
            expect(stateAfterFirstRemove.ingredients[0].quantity).toBe(1); 
        
            const stateAfterRemoveAgain = constructorReducer(stateAfterFirstRemove, removeIngredient(stateAfterFirstRemove.ingredients[0].id));
            expect(stateAfterRemoveAgain.ingredients.length).toBe(0); 
        })
    });

    describe('moveIngredient', () => {
        it('should move an ingredient', () => {
            const ingredient1: IngredientType = {
                _id: '7',
                name: 'Bacon',
                type: 'main', 
                price: 4,
                proteins: 2,
                fat: 3,
                carbohydrates: 0,
                calories: 50,
                image: 'bacon_image_url', 
            };
            const ingredient2: IngredientType = {
                _id: '8',
                name: 'Chicken',
                type: 'main', 
                price: 6,
                proteins: 5,
                fat: 3,
                carbohydrates: 1,
                calories: 70,
                image: 'chicken_image_url', 
            };
            
            let state = constructorReducer(initialState, addIngredient(ingredient1));
            state = constructorReducer(state, addIngredient(ingredient2));

            expect(state.ingredients[0].name).toBe('Bacon');
            expect(state.ingredients[1].name).toBe('Chicken');

            state = constructorReducer(state, moveIngredient({ dragIndex: 0, hoverIndex: 1 }));

            expect(state.ingredients[0].name).toBe('Chicken');
            expect(state.ingredients[1].name).toBe('Bacon');
        });
    });
});