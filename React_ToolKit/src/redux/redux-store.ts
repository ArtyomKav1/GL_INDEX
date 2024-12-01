
import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose, AnyAction } from "redux";
import dialogsReducer from './dialogs-reducer.ts';
import profileReducer from './profile-reducer.ts';
import usersReducer from './users-reducer.ts';
import authReducer from './auth-reducer.ts';
import appReducer from './app-reducer.ts';
import chatReducer from './chat-reducer.ts';
import { reducer as formReducer } from 'redux-form';
import { ThunkDispatch, thunk as thunkMidleware } from "redux-thunk"

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})


// type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
// export type ActionsTypes<T extends { [key: string]: (...arg: any[]) => any }> = ReturnType<PropertiesType<T>>



export type ActionsTypes<T> =  T extends {[key: string]: (...arg: any[]) => infer U } ? U : never





type RootReducerType = typeof rootReducers; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>
export type TDispatch = ThunkDispatch<AppStateType, void, AnyAction>;














// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMidleware)));




// @ts-ignore
window.store = store

export default store;