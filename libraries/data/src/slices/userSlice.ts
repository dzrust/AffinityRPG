import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

// Define a type for the slice state
interface UserState {
  user: User | null;
  isSignedIn: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  isSignedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isSignedIn = !!state.user;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
