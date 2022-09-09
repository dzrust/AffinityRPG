import {
  appSlice,
  userSlice,
  heroesAPI,
  itemsAPI,
  legendsAPI,
  masteriesAPI,
  rulesAPI,
  isLoadingMiddleware,
} from "@affinity-rpg/data";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    [heroesAPI.reducerPath]: heroesAPI.reducer,
    [itemsAPI.reducerPath]: itemsAPI.reducer,
    [legendsAPI.reducerPath]: legendsAPI.reducer,
    [masteriesAPI.reducerPath]: masteriesAPI.reducer,
    [rulesAPI.reducerPath]: rulesAPI.reducer,
  },
  middleware: (defaultMiddleware) => {
    return [
      ...defaultMiddleware(),
      heroesAPI.middleware,
      itemsAPI.middleware,
      legendsAPI.middleware,
      masteriesAPI.middleware,
      rulesAPI.middleware,
      isLoadingMiddleware,
    ];
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
