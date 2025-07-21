import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('token', token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

// Actions
export const { setUser, logOut } = authSlice.actions;

// Reducer
export default authSlice.reducer;

// Selectors
export const useCurrentToken = (state) => state.auth.token;
export const useCurrentUser = (state) => state.auth.user;
