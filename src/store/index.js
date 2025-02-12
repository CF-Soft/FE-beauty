import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { isAuthReducer } from "./reducers/auth-reducer";
import { userReducer } from "./reducers/user-reducer";
import { categoryReducer } from "./reducers/category-reducer";

const rootReducer = combineReducers({
  auth: isAuthReducer,
  users: userReducer,
  category: categoryReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
