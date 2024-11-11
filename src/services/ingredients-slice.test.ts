import { initialState, ingredientsSlice, fetchIngredients } from './ingredients-slice';
import { IngredientType } from '../utils/types';

const ingredientsReducer = ingredientsSlice.reducer;

describe('Ingredients reducer', () => {
  it('should return the initial state when an unknown action is passed', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should set loading to true when fetching ingredients', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it('should store ingredients after a successful fetch', () => {
    const payload: IngredientType[] = [
      {
        _id: '123',
        name: 'Test Ingredient',
        type: 'sauce', 
        proteins: 10,
        fat: 5,
        carbohydrates: 30,
        calories: 100,
        price: 200,
        image: 'test_image.png',
      },
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, ingredients: payload, loading: false });
  });

  it('should set an error message when fetch fails', () => {
    const error = 'Failed to fetch ingredients';
    const action = { type: fetchIngredients.rejected.type, payload: error };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: false, error });
  });

  it('should set the current ingredient', () => {
    const ingredient: IngredientType = {
      _id: '123',
      name: 'Test Ingredient',
      type: 'main',  
      proteins: 8,
      fat: 10,
      carbohydrates: 20,
      calories: 300,
      price: 250,
      image: 'ingredient_image.png',
    };
    const action = ingredientsSlice.actions.setCurrentIngredient(ingredient);
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, currentIngredient: ingredient });
  });

  it('should clear the current ingredient', () => {
    const stateWithIngredient = {
      ...initialState,
      currentIngredient: {
        _id: '123',
        name: 'Test Ingredient',
        type: 'main' as 'main',  
        proteins: 8,
        fat: 10,
        carbohydrates: 20,
        calories: 300,
        price: 250,
        image: 'ingredient_image.png',
      },
    };
    const action = ingredientsSlice.actions.clearCurrentIngredient();
    const state = ingredientsReducer(stateWithIngredient, action);
    expect(state).toEqual({ ...initialState, currentIngredient: null });
  });

  it('should activate ingredient highlight', () => {
    const action = ingredientsSlice.actions.activeHighlight();
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isHighlighted: true });
  });

  it('should remove ingredient highlight', () => {
    const stateWithHighlight = { ...initialState, isHighlighted: true };
    const action = ingredientsSlice.actions.removeHighlight();
    const state = ingredientsReducer(stateWithHighlight, action);
    expect(state).toEqual({ ...initialState, isHighlighted: false });
  });
});
