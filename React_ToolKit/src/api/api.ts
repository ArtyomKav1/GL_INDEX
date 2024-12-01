import axios from 'axios';
import { ProfileType, PhotosType } from "../types/types"
import { valueType } from '../components/Profile/ProfileInfo/ProfileDataForm';




const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" }

}
)





type GetUsersAPIType = {
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

type FollowAPIType = {
    resultCode: number
    messages: string[],
    data: {}
}

export const userAPI = {
    getUsersAPI(currentPage: number = 1, pageSize: number = 10, term: string, friend: null | boolean = null) {
        return instance.get<GetUsersAPIType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend == null ? '' : `&friend=${friend}`))
            .then(response => {
                return response;
            });
    },
    retGetUsersAPI(pageNumber: number = 1, pageSize: number = 10, term: string, friend: null | boolean = null) {
        return instance.get<GetUsersAPIType>(`users?page=${pageNumber}&count=${pageSize}&term=${term}` + (friend == null ? '' : `&friend=${friend}`))
    },
    followAPI(userId: number) {
        return instance.post<FollowAPIType>(`follow/${userId}`)
    },
    unfollowAPI(userId: number) {
        return instance.delete<FollowAPIType>(`follow/${userId}`)
    },
    getProfileAPI(userId: number | null) {
        // console.warn('test - Obsolete method. Please use profileAPI object')
        return profileAPI.getProfileAPI(userId);
    }

}








export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
    },
    login(email: string, password: string, rememberMe = true, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

type GetCaptchaUrl = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrl>(`security/get-captcha-url`)
    },

}





// export enum ResultCodeEnum {
//     Success = 0,
//     Error = 1,
//     CaptchaIsRequired = 10
// }
type GetProfileAPIResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type UpdateStatusAPIType = {
    data: {}
    fieldsErrors: []
    messages: string[]
    resultCode: number
}
type SavePhotoAPIsavePhotoAPIType = {

    data: { photos: PhotosType }
    messages: string[]
    fieldsErrors: []
    resultCode: number
}
type UpdateProfileAPIType = {
    data: {}
    fieldsErrors: []
    messages: string[]
    resultCode: number
}
export const profileAPI = {
    getProfileAPI(userId: number | null) {
        // debugger
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatusAPI(userId: number | null) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatusAPI(status: string) {
        return instance.put<UpdateStatusAPIType>(`profile/status`, { status: status });
    },
    savePhotoAPI(file: File) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<SavePhotoAPIsavePhotoAPIType>(`profile/photo`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    },
    updateProfileAPI(profileData: valueType) {
        return instance.put<UpdateProfileAPIType>(`profile`, profileData);
    },


}