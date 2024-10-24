import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IngredientType } from '../utils/types';
import { checkResponse } from '../utils/helpers';
import { BASE_URL } from './api';

interface IngredientsState {
	ingredients: IngredientType[];
	loading: boolean;
	error: string | null;
	currentIngredient: IngredientType | null;
	isHighlighted: boolean;
}

const initialState: IngredientsState = {
	ingredients: [],
	loading: false,
	error: null,
	currentIngredient: null,
	isHighlighted: false,
};

export const fetchIngredients = createAsyncThunk<
	IngredientType[],
	void,
	{ rejectValue: string }
>('ingredients/fetchIngredients', async () => {
	const response = await fetch(`${BASE_URL}/api/ingredients`);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const data = await checkResponse(response);
	return data.data;
});

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		setCurrentIngredient(state, action: PayloadAction<IngredientType>) {
			state.currentIngredient = action.payload;
		},
		clearCurrentIngredient(state) {
			state.currentIngredient = null;
		},
		activeHighlight(state) {
			state.isHighlighted = true;
		},
		removeHighlight(state) {
			state.isHighlighted = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.ingredients = action.payload;
				state.loading = false;
			})
			.addCase(
				fetchIngredients.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = false;
					state.error = action.payload || 'Ошибка загрузки ингредиентов';
				}
			);
	},
});

export const {
	setCurrentIngredient,
	clearCurrentIngredient,
	activeHighlight,
	removeHighlight,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;

export const selectIngredients = (state: { ingredients: IngredientsState }) =>
	state.ingredients.ingredients;
export const selectIngredientsLoading = (state: {
	ingredients: IngredientsState;
}) => state.ingredients.loading;
export const selectIngredientsError = (state: {
	ingredients: IngredientsState;
}) => state.ingredients.error;
export const selectCurrentIngredient = (state: {
	ingredients: IngredientsState;
}) => state.ingredients.currentIngredient;
