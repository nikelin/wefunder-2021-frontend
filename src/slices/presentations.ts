import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {PresentationData} from "../api/entities";
import {fetchPresentationsList} from "../api/presentation";

export type PresentationsState = {
    fetching: boolean,
    error: string|null,
    list: PresentationData[]
}

const initialState: PresentationsState = {
    fetching: false,
    error: null,
    list: []
}

export const performFetchPresentationsList = createAsyncThunk(
    "presentations/getlist",
    async (args, { rejectWithValue }) => {
        try {
            return await fetchPresentationsList();
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const presentationsSlice = createSlice({
    name: "presentations",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(performFetchPresentationsList.pending, (state) => {
            state.fetching = true
            state.error = null
        })

        builder.addCase(performFetchPresentationsList.fulfilled, (state, action) => {
            state.fetching = false
            state.error = null
            state.list = action.payload;
        })

        builder.addCase(performFetchPresentationsList.rejected, (state, action) => {
            state.fetching = false
            state.error = action.error.message || null;
        })
    }
})

export default presentationsSlice.reducer;
