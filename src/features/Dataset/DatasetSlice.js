import { createSlice } from "@reduxjs/toolkit";
import { createCombineDataset, createDataset, getAllCombinedDatasets, getAllDatasets, getDatasetsByUserId } from "./DatasetAction";

const datasetSlice = createSlice({
    name: "dataset",
    initialState: {
        newDatasets: {},
        allDatasets: [],
        datasetById: [],
        combineDatasets: {},
        allCombinedDatsets: [],
        combineDatasetLoading: false,
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
            })
            .addCase(getDatasetsByUserId.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(getDatasetsByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.datasetById = action.payload.data;
            })
            .addCase(getDatasetsByUserId.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = "Failed to get datasets by user id.";
            })
            .addCase(createCombineDataset.pending, (state) => {
                state.combineDatasetLoading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(createCombineDataset.fulfilled, (state, action) => {
                state.combineDatasetLoading = false;
                state.success = true;
                state.combineDatasets = action.payload.data;
            })
            .addCase(createCombineDataset.rejected, (state, action) => {
                state.combineDatasetLoading = false;
                state.success = false;
                state.error = "Failed to combine datasets.";
            })
            .addCase(getAllCombinedDatasets.pending, (state) => {
                state.combineDatasetLoading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(getAllCombinedDatasets.fulfilled, (state, action) => {
                state.combineDatasetLoading = false;
                state.success = true;
                state.allCombinedDatsets = action.payload.data;
            })
            .addCase(getAllCombinedDatasets.rejected, (state, action) => {
                state.combineDatasetLoading = false;
                state.success = false;
                state.error = "Failed to get all combined datasets.";
            });
    },
});

export default datasetSlice.reducer;
