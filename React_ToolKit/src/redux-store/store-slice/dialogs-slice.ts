import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DialogType, MessagesType } from "./Type-Slice";




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




export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {

        addNewMessages: (state, action: PayloadAction<{ body: string }>) => {
            state.messages = [...state.messages, { id: 6, message: action.payload.body }]
        },


    }
})





export const dialogsReducer = dialogsSlice.reducer
export const dialogsAction = dialogsSlice.actions