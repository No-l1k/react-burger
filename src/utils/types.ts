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

export interface User {
	email: string;
	name: string;
}

export interface AuthResponse {
	success: string;
	accessToken: string;
	refreshToken: string;
	user: User;
}

export interface LogoutResponse {
	success: boolean;
	message: string;
}

export interface UserResponse {
	success: boolean;
	user: User;
}

export interface IngredientsResponse {
	data: IngredientType[];
}

export interface PasswordResetResponse {
	success: boolean;
	message: string;
}

interface Owner {
	user: User;
	createdAt: string;
	updatedAt: string;
}

export interface Order {
	ingredients: string[];
	_id: string;
	owner?: Owner;
	status: 'done' | 'pending' | 'created';
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	totalPrice?: number;
	orderDate: string;
}

export interface OrderResponse {
	success: boolean;
	orders: Order[];
	order: Order;
	total?: number;
	totalToday?: number;
}

export interface IngredientData {
	price: number;
	image: string;
	name: string;
}

export interface IngredientDetailsId extends IngredientData {
	_id: string;
}

export type IngredientDataMap = Map<string, IngredientData>;

export interface OrderDetailsProps {
	orderNumber: number;
	orderName: string;
	ingredients: { ingredient: IngredientDetailsId; quantity: number }[];
	totalPrice: number;
	orderDate: string;
}

export interface IWsMessage {
    orders?: Array<Order>;
    success?: boolean;
    message?: string;
}

