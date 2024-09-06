export interface IngredientType {
	_id: string;
	name: string;
	type: 'bun' | 'sauce' | 'main';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile?: string;
	image_large?: string;
	__v?: number;
	quantity?: number;
}

export interface IngredientsData {
	ingredients: IngredientType[];
}

export interface IngredientGroup {
	bun: IngredientType[];
	sauce: IngredientType[];
	main: IngredientType[];
}
