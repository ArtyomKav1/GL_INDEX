import { ResultCodeEnum, authAPI, securityAPI } from "../api/api.ts"
import { FormAction, FormErrors, stopSubmit } from "redux-form"
import { ActionsTypes, AppStateType } from "./redux-store.ts";
import { ThunkAction } from "redux-thunk";




export type initialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
}
let initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}
const authReducer = (state = initialState, action: ActionTypeAuth): initialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.payload,
                isAuth: action.payload.isAuth
            }
        }
        case "SET_CAPTCHA_URL": {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }
        default:
            return state;
    }
}
type ActionTypeAuth = ActionsTypes<typeof ActionsAuth>
export const ActionsAuth = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: 'SET_USER_DATA', payload: { userId, email, login, isAuth } } as const),
    setCaptchaUrl: (captchaUrl: string) => ({ type: 'SET_CAPTCHA_URL', captchaUrl } as const)

}

// type stopSubmitType = {
//     stopSubmit: (form: string, errors?: FormErrors<any, any>) => FormAction;
// }
type ThunkType = ThunkAction<Promise<void >, AppStateType, unknown, ActionTypeAuth>



export const meThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = response.data.data
        dispatch(ActionsAuth.setAuthUserData(id, email, login, true));
    }
}


export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captchaUrl: string | null): ThunkType => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe, captchaUrl)
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(meThunkCreator());
    } else {
        if (response.data.resultCode === ResultCodeEnum.CaptchaIsRequired) {
            dispatch(getCaptchaThunkCreator());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        // @ts-ignore
        dispatch(stopSubmit("login", { _error: message }));
    };
}


export const getCaptchaThunkCreator = (): ThunkType => async (dispatch) => {

    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

    dispatch(ActionsAuth.setCaptchaUrl(captchaUrl))

}


export const logoutThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(ActionsAuth.setAuthUserData(null, null, null, false));
    }
}


export default authReducer; 