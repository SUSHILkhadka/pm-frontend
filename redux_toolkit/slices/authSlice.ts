import { URL_TO_BACKEND } from "@/constants/common";
import { getDataFromJWTToken } from "@/utils/jwt.utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getRefreshToken } from "../../cookies/cookie";
import { IAuth } from "../../interface/IAuth";

const initialValue: IAuth = {
  id: 0,
  username: "",
  email: "",
  status: "loading"
};

export const checkToken = createAsyncThunk(
  "authInfo/checkRefreshToken",
  async (): Promise<any> => {
    console.log("in thunk")

    const response = await axios.post(URL_TO_BACKEND + "/auth/token", {
      refreshToken: getRefreshToken()
    });

     const {accessToken} = response.data.data;

     console.log("response.data", response.data,getDataFromJWTToken(accessToken))

     return getDataFromJWTToken(accessToken)
  }
);

export const authSlice = createSlice({
  name: "authInfo",
  initialState: initialValue,
  reducers: {
    setAuthWithLoginResponse: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.name;
      state.email = action.payload.email;
      state.status = "fulfilled";
    },
    resetAuth: (state) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.status = "rejected";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.id = action.payload.id;
        state.username = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(checkToken.rejected, (state) => {
        state.status = "rejected";
        state.id = 0;
        state.username = "";
        state.email = "";
      });
  }
});

export const { setAuthWithLoginResponse, resetAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
