import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY } from "../types";

const initialState = {
  category: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return { ...state, category: action.payload };
    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter((i) => i.id !== action.payload),
      };
    case ADD_CATEGORY:
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    default:
      return state;
  }
};
