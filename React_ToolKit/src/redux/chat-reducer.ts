
import { v1 } from 'uuid'
import { ChatMessageAPIType, StatusType, chatAPI } from '../api/chat-api.ts'
import { ActionsTypes, AppStateType } from './redux-store'
// import {Action, Dispatch} from 'redux'
import { FormAction } from 'redux-form/lib/actions'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'


type ChatMessageType = ChatMessageAPIType & { id: string }



let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}
type initialStateType = typeof initialState
const chatReducer = (state = initialState, action: ActionTypeChat): initialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEVIED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
            }
        }
        case 'SN/chat/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default:
            return state

    }
}
type ActionTypeChat = ActionsTypes<typeof ActionsChat>
export const ActionsChat = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: 'SN/chat/MESSAGES_RECEVIED', payload: { messages }
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'SN/chat/STATUS_CHANGED', payload: { status }
    } as const)
}

export type InitialStateType = typeof initialState;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypeChat>

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null


const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(ActionsChat.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(ActionsChat.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer

