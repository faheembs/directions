import { createSlice } from "@reduxjs/toolkit";
import { createDataset, getAllDatasets } from "./DatasetAction";

const datasetSlice = createSlice({
    name: "dataset",
    initialState: {
        newDatasets: {},
        allDatasets: [],
        loading: false,
        success: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createDataset.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(createDataset.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.newDatasets = action.payload.data;
            })
            .addCase(createDataset.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = "Failed to create dataset.";
            })
            .addCase(getAllDatasets.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(getAllDatasets.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.allDatasets = action.payload.data;
            })
            .addCase(getAllDatasets.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = "Failed to create dataset.";
            });
    },
});

export default datasetSlice.reducer;
