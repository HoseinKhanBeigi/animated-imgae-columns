import { configureStore, combineReducers } from "@reduxjs/toolkit";
import photoSlice from "./slices/photoSlice";
import photosSliceTwo from "./slices/photoSliceTwo";

const rootReducer = combineReducers({
  photoSlice,
  photosSliceTwo,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
