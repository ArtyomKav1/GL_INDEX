import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"

import { UserData } from "./TypeSlice"
import { authAPI, securityAPI } from "../apiOld/api";
import { useAppDispatch } from "../hooks/hooks";

export interface authSliceState {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    captchaUrl: string | null;
    statusAuth: "idle" | "loading" | "failed"

}

const initialState: authSliceState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    statusAuth: "idle",
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}


export const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: create => ({

        setUserData: create.reducer(
            (state, action: PayloadAction<UserData>) => {
                state.userId = action.payload.id;
                state.email = action.payload.email;
                state.login = action.payload.login;
                console.log('успех')
                state.isAuth = true
            },
        ),
        setCaptchaUrl: create.reducer(
            (state, action: PayloadAction<string>) => {
                state.captchaUrl = action.payload;
            },
        ),
        setIsAuth: create.reducer(
            (state) => {
                state.isAuth = false;
            },
        ),

        authorizationtAsync: create.asyncThunk(
            async (id: number, { dispatch }) => {
                let response = await authAPI.me();
                if (response.data.resultCode === ResultCodeEnum.Success) {
                    dispatch(setUserData(response.data.data));
                }
            },
            {
                pending: state => {
                    state.statusAuth = "loading"
                },
                fulfilled: (state) => {
                    state.statusAuth = "idle"
                },
                rejected: state => {
                    state.statusAuth = "failed"
                },
            },
        ),
        loginAsync: create.asyncThunk(
            async (value, { dispatch }) => {

                let response = await authAPI.login(value.email, value.password, value.rememberMe, value.captchaUrl)
                if (response.data.resultCode === ResultCodeEnum.Success) {
                    debugger
                    dispatch(authorizationtAsync(1));
                } else {
                    if (response.data.resultCode === ResultCodeEnum.CaptchaIsRequired) {
                        dispatch(getCaptchaAsync(1));
                    }
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                    // @ts-ignore
                    dispatch(stopSubmit("login", { _error: message }));
                };
            },
            {
                pending: state => {
                    state.statusAuth = "loading"
                },
                fulfilled: (state) => {
                    state.statusAuth = "idle"
                },
                rejected: state => {
                    state.statusAuth = "failed"
                },
            },
        ),

        logoutAsync: create.asyncThunk(
            async (id: number, { dispatch }) => {

                let response = await authAPI.logout()
                if (response.data.resultCode === ResultCodeEnum.Success) {
                    const value = {
                        id: null,
                        email: null,
                        login: null,
                    }
                    dispatch(setUserData(value));
                    dispatch(setIsAuth())
                }
            },
            {
                pending: state => {
                    state.statusAuth = "loading"
                },
                fulfilled: (state) => {
                    state.statusAuth = "idle"
                },
                rejected: state => {
                    state.statusAuth = "failed"
                },
            },
        ),



        getCaptchaAsync: create.asyncThunk(
            async (id: number, { dispatch }) => {
                let response = await securityAPI.getCaptchaUrl()
                const captchaUrl = response.data.url
                dispatch(setCaptchaUrl(captchaUrl))
            },
            {
                pending: state => {
                    state.statusAuth = "loading"
                },
                fulfilled: (state) => {
                    state.statusAuth = "idle"
                    state.isAuth = true
                },
                rejected: state => {
                    state.statusAuth = "failed"
                },
            },
        ),



    }),

    

    selectors: {
        selectisAuth: auth => auth.isAuth,
        selectcaptchaUrls: auth => auth.captchaUrl,
        selectLogin: auth => auth.login,
        selectUserId: auth => auth.userId,
    },
})



export const {
    setIsAuth,
    setCaptchaUrl,
    setUserData,
    authorizationtAsync,
    loginAsync,
    getCaptchaAsync,
    logoutAsync
} = authSlice.actions


export const {
    selectisAuth,
    selectcaptchaUrls,
    selectLogin,
    selectUserId
} = authSlice.selectors

