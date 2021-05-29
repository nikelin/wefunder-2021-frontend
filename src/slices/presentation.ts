import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {PresentationData} from "../api/entities";
import {fetchPresentation} from "../api/presentation";

export type PresentationState = {
    fetching: boolean,
    error: string|null,
    presentation: PresentationData|null
}

const initialState: PresentationState = {
    fetching: false,
    error: null,
    presentation: null
}

export const performFetchPresentation = createAsyncThunk(
    "presentation/single",
    async (args: {id: number}, { rejectWithValue }) => {
        try {
            return await fetchPresentation(args.id);
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const presentationSlice = createSlice({
    name: "presentation",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(performFetchPresentation.pending, (state) => {
            state.fetching = true
            state.error = null
        })

        builder.addCase(performFetchPresentation.fulfilled, (state, action) => {
            state.fetching = false
            state.error = null
            state.presentation = action.payload;
        })

        builder.addCase(performFetchPresentation.rejected, (state, action) => {
            state.fetching = false
            state.error = action.error.message || null;
        })
    }
})

export default presentationSlice.reducer;
