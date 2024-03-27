import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../constants/baseURL"
import { toast } from "react-toastify";

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
                return responseData;
            } else {
                toast.error("Error in getting all user's data")
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
                return responseData;
            } else {
                toast.error("Error while updating the profile")
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addPremiumDatasets = createAsyncThunk(
    "users/add-premium",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseURL}users/${data.userId}/add-premium-datasets`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ datasetIds: data.datasetIds })

            });
            if (response.ok) {
                const responseData = await response.json();
                return responseData;
            } else {
                toast.error("Error while updating the user")
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCombinePermission = createAsyncThunk(
    "users/updateCombinePermission",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseURL}users/${data.userId}/allow-combine-datasets`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data.body)

            });
            if (response.ok) {
                const responseData = await response.json();
                toast.success("Permission updated successfully")
                return responseData;
            } else {
                toast.error("Error while updating permission")
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const updateExportDataPermission = createAsyncThunk(
    "users/allowExportData",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseURL}users/${data.userId}/allow-export-data`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data.body)

            });
            if (response.ok) {
                const responseData = await response.json();
                toast.success("Permission updated successfully")
                return responseData;
            } else {
                toast.error("Error while updating permission")
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);