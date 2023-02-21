import {
  combineReducers,
  configureStore,
  applyMiddleware
} from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice";
// import { allergyReducer } from '../slices/allergySlice';
// import { vaccineReducer } from '../slices/vaccineSlice';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const allReducers = combineReducers({
  auth: authReducer
  //   vaccine: vaccineReducer,
  //   allergy: allergyReducer,
});

export const store = configureStore({
  reducer: allReducers,
  devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
