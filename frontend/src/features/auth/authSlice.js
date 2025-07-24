
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  initialState.token = token;
  initialState.isAuthenticated = true;
  initialState.user = {
    email: decodedToken.email,
    role: decodedToken.role,
    id: decodedToken.id,
  };
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
