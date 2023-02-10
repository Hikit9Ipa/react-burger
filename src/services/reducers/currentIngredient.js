export const ADD_CURRENT_INGREDIENT = "ADD_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";

const initialIngredientState = {
  currentIngredient: {},
};

const currentIngredientReducer = (state = initialIngredientState, action) => {
  switch (action.type) {
    case ADD_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.item,
      };
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default currentIngredientReducer;
