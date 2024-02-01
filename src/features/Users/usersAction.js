import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../constants/baseURL"

const token = localStorage.getItem("userToken")
export const getAllUsers = createAsyncThunk(
    "users/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseURL}users/all-users`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },

            });
            if (response.ok) {
                const responseData = await response.json();
                console.log("res", responseData)
                return responseData;
            } else {
                toast.error("Error in getting all datasets")
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const editUser = createAsyncThunk(
    "users/edit",
    async (data, { rejectWithValue }) => {
        try {
            console.log(data)
            const response = await fetch(`${baseURL}users/${data.userId}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data.body)

            });
            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem("usersInfo", JSON.stringify(responseData.data));
                console.log("res", responseData)
                return responseData;
            } else {
                toast.error("Error in getting all datasets")
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
