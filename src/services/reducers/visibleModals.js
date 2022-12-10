export const OPEN_INGREDIENT = "OPEN_INGREDIENT";
export const CLOSE_INGREDIENT = "CLOSE_INGREDIENT";
export const OPEN_ORDER = "OPEN_ORDER";
export const CLOSE_ORDER = "CLOSE_ORDER";

const initialVisibalState = {
  ingredientVisible: false,
  orderVisible: false,
};

export const visibleReducer = (state = initialVisibalState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT: {
      return {
        ingredientVisible: true,
      };
    }
    case CLOSE_INGREDIENT: {
      return {
        ingredientVisible: false,
      };
    }
    case OPEN_ORDER: {
      return {
        orderVisible: true,
      };
    }
    case CLOSE_ORDER: {
      return {
        orderVisible: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default visibleReducer;
