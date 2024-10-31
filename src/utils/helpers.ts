import { IngredientData, IngredientDetailsId, Order } from "./types";

interface TransformedIngredient {
    ingredient: IngredientDetailsId;
    quantity: number;
}

export const checkResponse = async (res: Response) => {
  const data = await res.json();

  if (data.message === 'jwt expired') {
    throw new Error('jwt expired');
  }

  if (!res.ok) {
    return Promise.reject(data);
  }

  return data;
};

export const transformIngredients = (
    selectedOrder: Order | null,
    ingredientDataMap: Map<string, IngredientData>
): TransformedIngredient[] => {
    return selectedOrder && selectedOrder.ingredients.length > 0
        ? selectedOrder.ingredients.map((ingredientId, index) => {
            const ingredient = ingredientDataMap.get(ingredientId);
            const isBun = index === 0;  

            return ingredient ? {
                ingredient,
                quantity: isBun ? 2 : selectedOrder.ingredients.filter(id => id === ingredientId).length
            } : null;
        }).filter((item): item is TransformedIngredient => item !== null)
        : [];
};

export const calculateTotalPrice = (ingredients: TransformedIngredient[]): number => {
    return ingredients.reduce((acc, curr) => {
        return acc + (curr.ingredient.price * curr.quantity);
    }, 0);
};
