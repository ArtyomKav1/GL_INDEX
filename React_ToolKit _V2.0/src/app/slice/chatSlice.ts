import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"
import { v1 } from 'uuid'
import { ChatMessageType, StatusType, UserData } from "./TypeSlice"
import { authAPI, securityAPI } from "../apiOld/api";
import { useAppDispatch } from "../hooks/hooks";
import { chatAPI } from "../apiOld/chat-api";

let _newMessageHandler

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}



export const chatSlice = createAppSlice({
    name: "chat",
    initialState,
    reducers: create => ({


        messagesRecevied: create.reducer(
            (state, action: PayloadAction<StatusType>) => {
                state.status = action.payload
            },
        ),
        statusChanged: create.reducer(
            (state, action: PayloadAction<string>) => {
                state.messages = [...state.messages, 
                    ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
            },
        ),

        newMessageHandlerCreator: create.asyncThunk(
            async (id: number, { dispatch }) => {
                if (_newMessageHandler === null) {
                    _newMessageHandler = (messages) => {
                        dispatch(messagesRecevied(messages))
                    }
                }
                return _newMessageHandler
            },
            // {
            //     pending: state => {
            //         state.statusAuth = "loading"
            //     },
            //     fulfilled: (state) => {
            //         state.statusAuth = "idle"
            //     },
            //     rejected: state => {
            //         state.statusAuth = "failed"
            //     },
            // },
        ),
        _statusChangedHandler: create.asyncThunk(
            async (id: number, { dispatch }) => {
                if (_statusChangedHandler === null) {
                    _statusChangedHandler = (status) => {
                        dispatch(ActionsChat.statusChanged(status))
                    }
                }
                return _statusChangedHandler
            },
            // {
            //     pending: state => {
            //         state.statusAuth = "loading"
            //     },
            //     fulfilled: (state) => {
            //         state.statusAuth = "idle"
            //     },
            //     rejected: state => {
            //         state.statusAuth = "failed"
            //     },
            // },
        ),
        startMessagesListening: create.asyncThunk(
            async (id: number, { dispatch }) => {
                chatAPI.start()
                chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
                chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
            },
            // {
            //     pending: state => {
            //         state.statusAuth = "loading"
            //     },
            //     fulfilled: (state) => {
            //         state.statusAuth = "idle"
            //     },
            //     rejected: state => {
            //         state.statusAuth = "failed"
            //     },
            // },
        ),
        startMessagesListening: create.asyncThunk(
            async (id: number, { dispatch }) => {
                chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
                chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
                chatAPI.stop()
            },
            // {
            //     pending: state => {
            //         state.statusAuth = "loading"
            //     },
            //     fulfilled: (state) => {
            //         state.statusAuth = "idle"
            //     },
            //     rejected: state => {
            //         state.statusAuth = "failed"
            //     },
            // },
        ),
        sendMessage: create.asyncThunk(
            async (id: number, { dispatch }) => {
                chatAPI.sendMessage(message)
            },
            // {
            //     pending: state => {
            //         state.statusAuth = "loading"
            //     },
            //     fulfilled: (state) => {
            //         state.statusAuth = "idle"
            //     },
            //     rejected: state => {
            //         state.statusAuth = "failed"
            //     },
            // },
        ),


    }),

    

    selectors: {
        // selectisAuth: auth => auth.,

    },
})



export const {
    messagesRecevied
} = chatSlice.actions


export const {

} = chatSlice.selectors

