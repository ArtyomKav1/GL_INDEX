import { meThunkCreator } from "./auth-reducer.ts"
import { ThunkAction } from "@reduxjs/toolkit";
import { AppStateType, ActionsTypes } from "./redux-store.ts";


export type InitialStateType = {
    initialized: boolean,
}
let initialState: InitialStateType = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionTypeApp): InitialStateType => {
    switch (action.type) {
        case 'SET_INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}
type ActionTypeApp = ActionsTypes<typeof ActionsApp>
export const ActionsApp = {
    initializedSuccess: () => ({ type: 'SET_INITIALIZED_SUCCESS' } as const)
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypeApp>
// первый показатель void а должен быть Promise<void>



export const initializedAppThunkCreator = (): ThunkType => (dispatch) => {

    let promise = dispatch(meThunkCreator());

    Promise.all([promise]).then(() => {
        dispatch(ActionsApp.initializedSuccess());

    })
}



export default appReducer;



















// case SET_USER_DATA: {
//     return {
//         ...state,
//         ...action.payload,
//         isAuth: action.payload.isAuth
//     }
// }





