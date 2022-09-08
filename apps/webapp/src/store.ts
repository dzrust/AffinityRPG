import { configureStore } from "@reduxjs/toolkit";
import { heroesAPI } from "@affinity-rpg/data/src/api/heroes";
import { itemsAPI } from "@affinity-rpg/data/src/api/items";
import { legendsAPI } from "@affinity-rpg/data/src/api/legends";
import { masteriesAPI } from "@affinity-rpg/data/src/api/masteries";
import { rulesAPI } from "@affinity-rpg/data/src/api/rules";
import appSlice, { isLoadingMiddleware } from "@affinity-rpg/data/src/slices/appSlice";
import userSlice from "@affinity-rpg/data/src/slices/userSlice";

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
