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
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
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
