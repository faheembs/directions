import { createSlice } from "@reduxjs/toolkit";
import { addPremiumDatasets, getAllUsers, updateCombinePermission } from "./usersAction";

const UsersSlice = createSlice({
    name: "users",
    initialState: {
        allUsers: [],
        isLoading: false,
        success: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.allUsers = action.payload.data;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = "Failed to get users";
            })
            .addCase(addPremiumDatasets.pending, (state) => {
                state.isLoading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(addPremiumDatasets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.allUsers = action.payload.data;
            })
            .addCase(addPremiumDatasets.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = "Failed to add dataset.";
            })
            .addCase(updateCombinePermission.pending, (state) => {
                state.isLoading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(updateCombinePermission.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.combinePermission = action.payload.data;
            })
            .addCase(updateCombinePermission.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = "Failed to update permission.";
            });
    },
});

export default UsersSlice.reducer;
