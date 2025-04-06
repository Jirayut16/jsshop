//หน้่านี้มีหน้าที่รวบรวม store

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    //Add store here
    user: userSlice,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
