import {
  createSlice,
  isFulfilled,
  isPending,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RollNotification } from "@affinity-rpg/models";
import { VERSION } from "@affinity-rpg/models";

// Define a type for the slice state
interface AppState {
  loadingCount: number;
  version: VERSION;
  rollNotification: RollNotification[];
}

// Define the initial state using that type
const initialState: AppState = {
  loadingCount: 0,
  version: VERSION.LATEST,
  rollNotification: [],
};

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loadingCount++;
    },
    stopLoading: (state) => {
      state.loadingCount = Math.max(state.loadingCount - 1, 0);
    },
    setVersion: (state, action: PayloadAction<VERSION>) => {
      state.version = action.payload;
    },
    addRollNotification: (state, action: PayloadAction<RollNotification>) => {
      state.rollNotification = [...state.rollNotification, action.payload];
    },
    removeRollNotification: (state, action: PayloadAction<number>) => {
      state.rollNotification = state.rollNotification.filter((_, index) => index !== action.payload);
    },
  },
});

export const { startLoading, stopLoading, setVersion, addRollNotification, removeRollNotification } = appSlice.actions;

export default appSlice.reducer;

export const isLoadingMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action) || isFulfilled(action)) {
    api.dispatch(stopLoading());
  }

  if (isPending(action)) {
    api.dispatch(startLoading());
  }

  return next(action);
};
