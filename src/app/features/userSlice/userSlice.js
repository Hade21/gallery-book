import { createSlice } from "@reduxjs/toolkit";

const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const initialState = {
  email: "",
  validEmail: false,
  pwd: "",
  validPwd: false,
  validPwdLogin: false,
  pwdFocus: false,
  matchPwd: "",
  validMatch: false,
  matchFocus: false,
  errMsg: "",
  setAuth: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    validateEmail: (state, action) => {
      const res = EMAIL_REGEX.test(action.payload);
      return {
        ...state,
        validEmail: res,
      };
    },
    setEmailFocus: (state, action) => {
      return {
        ...state,
        emailFocus: action.payload,
      };
    },
    setPwd: (state, action) => {
      return {
        ...state,
        pwd: action.payload,
      };
    },
    validatePass: (state, action) => {
      const res = PASS_REGEX.test(action.payload);
      return {
        ...state,
        validPwd: res,
      };
    },
    validatePassLogin: (state, action) => {
      if (typeof action.payload !== Boolean) {
        return {
          ...state,
          pwd: action.payload.toString(),
          validPwdLogin: true,
        };
      }
    },
    setPassFocus: (state, action) => {
      return {
        ...state,
        pwdFocus: action.payload,
      };
    },
    setMatch: (state, action) => {
      return {
        ...state,
        matchPwd: action.payload,
      };
    },
    validateMatch: (state) => {
      const match = state.pwd === state.matchPwd;
      return {
        ...state,
        validMatch: match,
      };
    },
    setMatchFocus: (state, action) => {
      return {
        ...state,
        matchFocus: action.payload,
      };
    },
    setErrMsg: (state, action) => {
      return {
        ...state,
        errMsg: action.payload,
      };
    },
    reset: (state) => {
      return {
        ...state,
        username: "",
        validUser: false,
        userFocus: false,
        email: "",
        validEmail: false,
        pwd: "",
        validPwd: false,
        validPwdLogin: false,
        pwdFocus: false,
        matchPwd: "",
        validMatch: false,
        matchFocus: false,
        errMsg: "",
      };
    },
    setAuth: (state, action) => {
      return {
        ...state,
        setAuth: action.payload,
      };
    },
  },
});

export const {
  setEmail,
  setEmailFocus,
  setUser,
  setUserFocus,
  setMatch,
  setMatchFocus,
  setPwd,
  setPassFocus,
  setErrMsg,
  validateUser,
  validateEmail,
  validatePass,
  validatePassLogin,
  validateMatch,
  reset,
  setAuth,
} = registerSlice.actions;

export default registerSlice.reducer;
