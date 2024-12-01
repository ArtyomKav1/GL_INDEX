import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"

import { UserData } from "./TypeSlice"
import { authAPI, securityAPI } from "../apiOld/api";
import { useAppDispatch } from "../hooks/hooks";
import { authorizationtAsync } from "./authSlice";

export interface authSliceState {
    initialized: boolean
    styleSwitcher: boolean
}

const initialState: authSliceState = {
    initialized: false,
    styleSwitcher: true
}



export const appSlice = createAppSlice({
    name: "app",
    initialState,
    reducers: create => ({
        setInitializedSuccess: create.reducer(
            (state) => {
                state.initialized = true;
            },
        ),
        setStyleSwitcher: create.reducer(
            (state) => {
                if(state.styleSwitcher){
                    state.styleSwitcher = false;
                }else{
                    state.styleSwitcher = true;
                }
                
            },
        ),




        initializedAppAsync: create.asyncThunk(
            async (id: number, { dispatch }) => {
                let promise = dispatch(authorizationtAsync(1));
                Promise.all([promise]).then(() => {
                    dispatch(setInitializedSuccess());
                })
            },
            // {
            //     pending: state => {
            //         state.status = "loading"
            //     },
            //     fulfilled: (state) => {
            //         state.status = "idle"
            //     },
            //     rejected: state => {
            //         state.status = "failed"
            //     },
            // },
        ),

    }),



    selectors: {
        selectInitialized: app => app.initialized,
        selectStyleSwitcher: app => app.styleSwitcher,

    },
})



export const {
    setStyleSwitcher,
    initializedAppAsync,
    setInitializedSuccess
} = appSlice.actions


export const {
    selectStyleSwitcher,
    selectInitialized
} = appSlice.selectors

