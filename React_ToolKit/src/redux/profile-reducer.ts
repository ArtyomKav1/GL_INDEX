import { userAPI, profileAPI, ResultCodeEnum } from "../api/api.ts"
import { stopSubmit } from "redux-form"
import { ActionsTypes,  AppStateType } from "./redux-store.ts";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { valueType } from "../components/Profile/ProfileInfo/ProfileDataForm.tsx";



type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string

}
type PhotosType = {
    small: string | null
    large: string | null
}
export type PostsType = {
    id: number
    message: string
    likesCount: number
}

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'Its my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 },
        { id: 5, message: 'Dada', likesCount: 11 },
    ] as Array<PostsType>,

    profile: null as ProfileType | null,
    status: '' as string,
    editMode: false as boolean,
}

export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: ActionTypeProfile): InitialStateType => {
    switch (action.type) {
        case 'ADD_NEW_POST': {
            let newPost = {
                id: 5,
                message: action.textPost,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case 'DELETE_POST': {
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        }
        case 'SET_USER_PROFILE': {
            return { ...state, profile: action.profile }
        }
        case 'SET_USER_STATUS': {
            return { ...state, status: action.status }
        }
        case 'SET_PHOTO': {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        case 'SET_EDIT_MODE': {
            return { ...state, editMode: action.result }
        }
        case "ADD_LIKE": {
            return {
                ...state, posts: state.posts.map(p => {
                    if (p.id === action.postId) {
                        p.likesCount = p.likesCount + 1
                    }
                    return p
                }
                )
            }
        }
        case "REMOVE_LIKE": {
            return {
                ...state, posts: state.posts.map(p => {
                    if (p.id === action.postId && p.likesCount > 0) {
                        p.likesCount = p.likesCount - 1
                    }
                    return p
                }
                )
            }
        }
        default:
            return state;
    }
}

export type ActionTypeProfile = ActionsTypes<typeof ActionsProfile>
export const ActionsProfile = {
    addNewPost: (textPost: string) => ({ type: 'ADD_NEW_POST', textPost } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
    setUserStatus: (status: string) => ({ type: 'SET_USER_STATUS', status } as const),
    setPhoto: (photos: PhotosType) => ({ type: 'SET_PHOTO', photos } as const),
    setEditMode: (result: boolean) => ({ type: 'SET_EDIT_MODE', result } as const),
    deletePost: (postId: number) => ({ type: 'DELETE_POST', postId } as const),
    addLike: (postId: number) => ({ type: 'ADD_LIKE', postId } as const),
    removeLike: (postId: number) => ({ type: 'REMOVE_LIKE', postId } as const),
}


export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypeProfile>

export const getUserProfileThunkCreator = (userId: number | null): ThunkType => async (dispatch) => {
    let response = await userAPI.getProfileAPI(userId)
    dispatch(ActionsProfile.setUserProfile(response.data));
}
export const getUserStatusThunkCreator = (userId: number | null): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatusAPI(userId)
    dispatch(ActionsProfile.setUserStatus(response.data));
}
export const updateUserStatusThunkCreator = (status: string): ThunkType => async (dispatch) => {

    let response = await profileAPI.updateStatusAPI(status)
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(ActionsProfile.setUserStatus(status));
    }
}
export const savePhotoThunkCreator = (file: any): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhotoAPI(file)

    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(ActionsProfile.setPhoto(response.data.data.photos));
    }
}
export const saveProfileThunkCreator = (profileData: valueType): ThunkType => async (dispatch, getState) => {
    const userId: number | null = getState().auth.userId
    const response = await profileAPI.updateProfileAPI(profileData)
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(ActionsProfile.setEditMode(false))
        dispatch(getUserProfileThunkCreator(userId))
    } else {
        // dispatch(stopSubmit("ProfileDataForm", { "contacts": { "facebook": response.data.messages[0] } }))
        // @ts-ignore
        dispatch(stopSubmit("ProfileDataForm", { _error: response.data.messages[0] }));
    }
}




export default profileReducer;




































// const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
// export const addPostActionCreator = () => ({ type: ADD_POST })
// export const updateNewPostTextActionCreator = (text) =>
//     ({ type: UPDATE_NEW_POST_TEXT, newText: text })

// case ADD_POST: {
//     let newPost = {
//         id: 5,
//         message: state.newPostText,
//         likesCount: 0
//     };
//     return {
//         ...state,
//         posts: [...state.posts, newPost],
//         newPostText: '',
//     }
// let stateCopy = { ...state }
// stateCopy.posts = [...state.posts]
// stateCopy.posts.push(newPost);
// stateCopy.newPostText = '';
// return stateCopy;
// }
// case UPDATE_NEW_POST_TEXT: {
//     return {
//         ...state,
//         newPostText: action.newText,
//     }
// let stateCopy = { ...state }
// stateCopy.newPostText = action.newText;
// return stateCopy;
// }