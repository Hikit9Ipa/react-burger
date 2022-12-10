import { combineReducers } from "redux";

import ingredientsReducer from "./ingredients";
import constructorReducer from "./constructor";
import visibleReducer from "./visibleModals";
import currentIngredientReducer from "./currentIngredient";
import orderReducer from "./order";
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorReducer,
  visible: visibleReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});
