import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientType } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

interface BurgerConstructorState {
	bun: IngredientType | null;
	ingredients: (IngredientType & { id: string; quantity: number })[];
}

const initialState: BurgerConstructorState = {
	bun: null,
	ingredients: [],
};

const ConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		setBun(state, action: PayloadAction<IngredientType>) {
			state.bun = action.payload;
		},
		setIngredients(state, action: PayloadAction<IngredientType[]>) {
			state.ingredients = action.payload.map((ingredient) => ({
				...ingredient,
				id: uuidv4(),
				quantity: 1,
			}));
		},
		addIngredient(state, action: PayloadAction<IngredientType>) {
			const newIngredient = { ...action.payload, id: uuidv4(), quantity: 1 };
			state.ingredients.push(newIngredient);
		},
		removeIngredient(state, action: PayloadAction<string>) {
			const id = action.payload;
			const existingIngredient = state.ingredients.find(
				(ingredient) => ingredient.id === id
			);
			if (existingIngredient) {
				if (existingIngredient.quantity > 1) {
					existingIngredient.quantity--;
				} else {
					state.ingredients = state.ingredients.filter(
						(ingredient) => ingredient.id !== id
					);
				}
			}
		},
		moveIngredient(
			state,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) {
			const { dragIndex, hoverIndex } = action.payload;
			const draggedItem = state.ingredients[dragIndex];

			state.ingredients.splice(dragIndex, 1);
			state.ingredients.splice(hoverIndex, 0, draggedItem);
		},
	},
});

export const {
	setBun,
	setIngredients,
	addIngredient,
	removeIngredient,
	moveIngredient,
} = ConstructorSlice.actions;
export default ConstructorSlice.reducer;
