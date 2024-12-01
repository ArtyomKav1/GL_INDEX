import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData, initialStateType } from "./Type-Slice";



let initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setUserData: (state, action: PayloadAction<UserData>) => {
            state.userId = action.payload.id;
            state.email = action.payload.email;
            state.login = action.payload.login;
            state.isAuth = action.payload.isAuth;
        },

        setCaptchaUrl: (state, action: PayloadAction<string>) => {
            state.captchaUrl = action.payload;
        },


    }
})


export const {
    setUserData,
    setCaptchaUrl

} = authSlice.actions


export const authReducer = authSlice.reducer
export const authAction = authSlice.actions