import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    isAuthed: false,
    error: null,
    userId: 0,
    userName: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("dociFindToken", action.payload.token);
    },
    error: (state, action) => {
      state.error = action.payload;
    },
    user: (state, action) => {
      state.userId = action.payload;
      state.isLoggedIn = true
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },

    setLoggedInStatus: (state, action) => {
      state.isAuthed = action.payload;
      console.log(state.isAuthed)
    },
  },
});

export const { loginSuccess, user, setUserName, setLoggedInStatus } = slice.actions;

// Thunk action to log in a user
export const loginUser = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_HOSTED_API}/auth/login`, {
      userName: username,
      password: password,
    });
    dispatch(loginSuccess(response.data));
    console.log(response.data)

  } catch (error) {
    dispatch(error(error));
  }
};


//may just do this with token. Make sure token expires
//Thunk action to check if a user is logged in
export const checkLoginStatus = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("dociFindtoken");
    const getUser = await axios.get(`${import.meta.env.VITE_HOSTED_API}/auth/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log(getUser.data);
    dispatch(setLoggedInStatus(getUser.data.success))
    dispatch(user(getUser.data.data.id));
    dispatch(setUserName(getUser.data.data.userName));
  } catch (error) {
    console.log(error);
  }
};

export const signupUser = (email, username, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_HOSTED_API}/auth/signup`, {
      email: email,
      userName: username,
      password: password,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(setLoggedInStatus(false));
  dispatch(user(null));
  dispatch(setUserName(null));
};


export default slice.reducer;