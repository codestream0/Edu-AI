import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, 
        action: PayloadAction<{User: User, accessToken: string}>) => {
      state.user = action.payload.User;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },


    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;