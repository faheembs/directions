import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./usersAction";

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
                state.error = "Failed to create dataset.";
            });
    },
});

export default UsersSlice.reducer;
