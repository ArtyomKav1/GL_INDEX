export type PhotosType = {
    small: string | null
    large: string | null
}
export type UsersType = {
    name: string,
    id: number,
    photos: PhotosType
    status: string,
    followed: boolean
}
export type UsersInitialStateType = {
    users: Array<UsersType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    filter: { term: string, friend: null | boolean }
}
export type FilterType = {
    term: string;
    friend: null | boolean;
}


export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string

}

export type PostsType = {
    id: number
    message: string
    likesCount: number
}



export type DialogType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type initialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
}

export type InitialStateType = {
    initialized: boolean,
}
export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type ChatMessageType = ChatMessageAPIType & { id: string }
export type StatusType = 'pending' | 'ready' | 'error'

export type retDataUsers = {
    pageNumber: number
    pageSize: number
    filter: FilterType
}

export type UserData = {
    id: number | null
    email: string | null
    login: string | null

} 