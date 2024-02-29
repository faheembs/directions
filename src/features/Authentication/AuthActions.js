import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../constants/baseURL"

const token = localStorage.getItem("userToken");

export const userLogin = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(body),
      });
      if (response) {
        const responseData = await response.json();
        if (!responseData.status) {
          localStorage.setItem("userToken", responseData.token.token);
          localStorage.setItem("usersInfo", JSON.stringify(responseData.data));
          return responseData.data;
        } else {
          return responseData.message;

        }
      }

    } catch (error) {
      if (error.response) {
        return rejectWithValue(error?.response?.data?.error?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const userRegister = createAsyncThunk(
  "auth/user",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(body),
      });
      if (response) {
        const responseData = await response.json();
        console.log("try", responseData)
        if (responseData.response) {
          return responseData;
        } else {
          return responseData.message;
        }
      }
    } catch (error) {
      console.log("catch", error)
      if (error.response) {

        return rejectWithValue(error?.response?.data?.error?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);