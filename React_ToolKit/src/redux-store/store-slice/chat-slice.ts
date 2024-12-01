import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatMessageType, StatusType, UsersInitialStateType, UsersType } from "./Type-Slice";
import { FilterType } from "../../redux/users-reducer";
import { v1 } from 'uuid'

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}



export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {

        messagesRecevied: (state, action: PayloadAction<{ messages: ChatMessageType[] }>) => {
            state.messages = [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
        },
        statusChanged: (state, action: PayloadAction<{ status: StatusType }>) => {
            state.status = action.payload.status
        },

    }
})





export const chatReducer = chatSlice.reducer
export const chatAction = chatSlice.actions