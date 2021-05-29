import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {presentationsSlice} from "./slices/presentations";
import {presentationSlice} from "./slices/presentation";

const rootReducer = combineReducers({
    presentations: presentationsSlice.reducer,
    presentation: presentationSlice.reducer
})

window.process = {
    env: {
        // @ts-ignore
        EXPERIMENTAL_ENABLED: false
    }
}

export type AppState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware()
})

export const dispatch = store.dispatch
store.subscribe(() => console.log(store.getState()))
