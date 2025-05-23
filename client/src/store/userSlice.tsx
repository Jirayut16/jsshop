import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: string;
  user: { name: string; role: string; token: string; picture?: string };
}

const initialState: CounterState = {
  value: "",
  user: { name: "", role: "", token: "", picture: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = "user login";
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { name: "", role: "", token: "", picture: "" };
      localStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

// Reducer ที่ export ออก
export default userSlice.reducer;
