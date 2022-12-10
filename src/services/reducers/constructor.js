export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

const initialConstructorState = {
  constructorIngredients: [],
};

const constructorReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      //console.log("ADD_INGREDIENT", action.draggedIngredient);
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.draggedIngredient,
        ],
      };
    }
    case DELETE_INGREDIENT: {
      const delItemindex = state.constructorIngredients
        .map((item) => item.key)
        .indexOf(action.id);
      //console.log("del_INGREDIENT");
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          (item, index) => index !== delItemindex
        ),
      };
    }
    case MOVE_INGREDIENT: {
      const constructorIngredients = [...state.constructorIngredients];
      const draggedIngredient = constructorIngredients[action.payload.dragIndex];
      constructorIngredients.splice(action.payload.dragIndex, 1);
      constructorIngredients.splice(action.payload.hoverIndex,0,draggedIngredient);

      return {
        ...state,
        constructorIngredients: constructorIngredients,
      };
    }
    default: {
      return state;
    }
  }
};

export const moveIngredients = (dragIngredient, hoverIngredient) => {
  return function (dispatch) {
    dispatch({
      type: MOVE_INGREDIENT,
      payload: {
        dragIndex: dragIngredient,
        hoverIndex: hoverIngredient,
      },
    });
  };
};

export default constructorReducer;
