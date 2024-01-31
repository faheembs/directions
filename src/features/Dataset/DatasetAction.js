import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../constants/baseURL"
import { toast } from "react-toastify";




export const getAllDatasets = createAsyncThunk(
    "dataset/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseURL}dataset/getAll`);
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

export const updateIsPremium = createAsyncThunk(
    "dataset/editDataset",
    async ({ datasetId, isPremium }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseURL}dataset/${datasetId}/editDataset`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isPremium }),
            });

            if (response.ok) {
                const responseData = await response.json();
                toast.success('Dataset Type has been updated successfully')
                return responseData;
            } else {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createDataset = createAsyncThunk(
    "dataset/create",
    async (formDataToSend, { rejectWithValue }) => {
        console.log("form data action ---->", formDataToSend)
        try {

            var form_data = new FormData();

            form_data.append("label", formDataToSend.label);
            form_data.append("queryType", formDataToSend.queryType);
            form_data.append("description", formDataToSend.description);
            form_data.append("detail", formDataToSend.detail);
            form_data.append("size", formDataToSend.size);
            form_data.append("visible", formDataToSend.visible);
            form_data.append("isPremium", formDataToSend.isPremium);
            form_data.append("data", formDataToSend.dataFile);
            form_data.append("config", formDataToSend.configFile);

            // Append photos separately
            if (formDataToSend.imageFile) {

                form_data.append("image", formDataToSend.imageFile);
            }
            const response = await fetch(`${baseURL}dataset/create`, {
                method: "POST",
                headers: {
                    // "Content-Type": "multipart/form-data; boundary=123456789234567845"
                },
                body: form_data,
            });
            if (response) {
                const responseData = await response.json();
                console.log("try", responseData)
                if (responseData.data) {
                    toast.success("Dataset has been created")
                    return responseData;
                } else {
                    toast.error("Dataset doesnot created!")
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

export const deleteDataset = createAsyncThunk(
    "dataset/delete",
    async (datasetId, { rejectWithValue }) => {
        console.log('datasetId', datasetId)
        try {
            const response = await fetch(`${baseURL}dataset/${datasetId}/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                toast.warn("Dataset deleted!")
                return responseData;
            } else {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
