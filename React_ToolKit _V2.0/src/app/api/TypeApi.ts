export type GetUsersAPIType = {
    items: [
        {
            name: string
            id: number
            photos: {
                small: string
                large: string
            }
            status: string
            followed: false
        },

    ]
    totalCount: number
    error: null | string

}


export type ArgGetUsersAPIType = {
    currentPage: number
    pageSize: number
    term: string
    friend: null | boolean
}

export type ArgretGetUsersAPI = {
    pageNumber: number
    pageSize: number
    term: string
    friend: null | boolean
}
export type FollowAPIType = {
    status: number
    data: {};
}

export type MeResponseType = {
    data: {
        id: number;
        email: string;
        login: string;
    };
    resultCode: ResultCodeEnum;
    messages: string[];
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}


export type Argloginlogin = {
    email: string
    password: string
    rememberMe: boolean
    captchaUrl: null | string
}
export type LoginResponseType = {
    data: {
        userId: number;
    };
    resultCode: ResultCodeEnum;
    messages: string[];
}
export type GetCaptchaUrl = {
    url: string;
}
export type ProfileType = {
    aboutMe: string;
    userId: number;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: ContactsType;
    photos: PhotosType;
}
export type PhotosType = {
    small: string | null
    large: string | null
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

export type UpdateStatusAPIType = {
    data: {};
    fieldsErrors: [];
    messages: string[];
    resultCode: number;
}
export type UpdateProfileAPIType = {
    data: {};
    fieldsErrors: [];
    messages: string[];
    resultCode: number;
}
export type valueType = {
    lookingForAJob?: boolean | undefined;
    lookingForAJobDescription?: string | undefined;
    fullName?: string | undefined;
    contacts?: ContactsType | undefined;
    AboutMe?: string | undefined;
}
