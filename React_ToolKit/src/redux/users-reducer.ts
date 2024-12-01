import { userAPI, ResultCodeEnum } from "../api/api.ts"
import { ActionsTypes, AppStateType } from "./redux-store.ts";
import { ThunkAction } from "@reduxjs/toolkit";


type PhotosType = {
    small: string | null
    large: string | null
}
type UsersType = {
    name: string,
    id: number,
    photos: PhotosType
    status: string,
    followed: boolean
}
type UsersInitialStateType = {
    users: Array<UsersType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    filter: { term: string, friend: null | boolean }
}

let initialState: UsersInitialStateType = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 5,
    isFetching: true,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null
    }
};


const usersReducer = (state = initialState, action: ActionTypeUsers): UsersInitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case 'SET_USERS': {
            return { ...state, users: action.users }
        }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.count }
        }
        case 'TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case 'SET_CURRENT_FILTER': {
            return {
                ...state,
                filter: action.filter
            }
        }
        default:
            return state;
    }
}

type ActionTypeUsers = ActionsTypes<typeof ActionsUsers>
export const ActionsUsers = {
    follow: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollow: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setUsersTotalCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
    setCurrentFilter: (filter: FilterType) => ({ type: 'SET_CURRENT_FILTER', filter } as const),

}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypeUsers>








export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(ActionsUsers.toggleIsFetching(true));

    dispatch(ActionsUsers.setCurrentFilter(filter));
    let response = await userAPI.getUsersAPI(currentPage, pageSize, filter.term, filter.friend)
    dispatch(ActionsUsers.toggleIsFetching(false));
    dispatch(ActionsUsers.setUsers(response.data.items));
    dispatch(ActionsUsers.setUsersTotalCount(response.data.totalCount));
}





export const onPageChangedThunkCreator = (pageNumber: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(ActionsUsers.setCurrentPage(pageNumber));
    dispatch(ActionsUsers.toggleIsFetching(true))
    dispatch(ActionsUsers.setCurrentFilter(filter));
    let response = await userAPI.retGetUsersAPI(pageNumber, pageSize, filter.term, filter.friend);
    dispatch(ActionsUsers.toggleIsFetching(false))
    dispatch(ActionsUsers.setUsers(response.data.items));
}




export const followThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    dispatch(ActionsUsers.toggleIsFollowingProgress(true, userId));
    let response = await userAPI.followAPI(userId)
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(ActionsUsers.follow(userId));
    }
    dispatch(ActionsUsers.toggleIsFollowingProgress(false, userId));
}




export const unfollowThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    dispatch(ActionsUsers.toggleIsFollowingProgress(true, userId));
    let response = await userAPI.unfollowAPI(userId);
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(ActionsUsers.unfollow(userId));
    }
    dispatch(ActionsUsers.toggleIsFollowingProgress(false, userId));
}



export type FilterType = typeof initialState.filter

export default usersReducer;