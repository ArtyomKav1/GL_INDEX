import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"

import { DialogType, MessagesType, UserData } from "./TypeSlice"
import { authAPI, securityAPI } from "../apiOld/api";
import { useAppDispatch } from "../hooks/hooks";

export interface authSliceState {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    captchaUrl: string | null;
    status: "idle" | "loading" | "failed"

}

let initialState = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ] as Array<MessagesType>,
}




export const dialogsSlice = createAppSlice({
    name: "dialogs",
    initialState,
    reducers: create => ({

        addNewMessages: create.reducer(
            (state, action: PayloadAction<string>) => {
                state.messages = [...state.messages, { id: 6, message: action.payload }]
            }
        ),
    }),



    selectors: {
        selectisDialogs: dialogs => dialogs,

    },
})



export const {
    addNewMessages
} = dialogsSlice.actions


export const {
    selectisDialogs
} = dialogsSlice.selectors

