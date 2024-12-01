import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialStateType, UsersInitialStateType, } from "./Type-Slice";


let initialState: InitialStateType = {
    initialized: false,
}



export const appSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

        setInitializedSuccess: (state) => {
            state.initialized = true
        },


    }
})


export const {
    setInitializedSuccess

} = appSlice.actions


export const appReducer = appSlice.reducer
export const appAction = appSlice.actions