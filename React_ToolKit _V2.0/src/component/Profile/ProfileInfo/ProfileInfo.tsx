import React, { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import Style from './ProfileInfo.module.scss';
// import Preloader from '../../Preloader/Preloader.tsx';
// import ProfileStatus from "./ProfileStatus"

// import { ProfileDataForm, ProfileData, valueType } from "./ProfileDataForm.tsx"
// import { ProfileType, PhotosType } from '../../../types/types';
import { Navigate, useParams } from 'react-router-dom';

import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
// import ButtonInput from '../../Common/FormsControl/BTN/btn-input.jsx';
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from 'src/app/hooks/hooks';
import { selectisAuth, selectUserId } from 'src/app/slice/authSlice';
import {
    getUserProfileAsync, getUserStatusAsync, savePhotoAsync, saveProfileAsync, selectEditMode,
    selectProfile, selectStatus, setEditMode,
    updateUserStatusAsync
} from 'src/app/slice/profileSlice';
import { ProfileData, ProfileDataForm, valueType } from './ProfileDataForm';
import ProfileStatus from './ProfileStatus';






const ProfileInfo: React.FC = React.memo(() => {

    const dispatch = useAppDispatch()
    const params = useParams()
    const isAuth = useAppSelector(selectisAuth)
    const authorizerUserId = useAppSelector(selectUserId)
    const status = useAppSelector(selectStatus)
    const editMode = useAppSelector(selectEditMode)
    const profile = useAppSelector(selectProfile)
    const isOwner = !params.userId




    const refreshProfile = () => {

        let userId: number | undefined | null = +params.userId;
        if (!userId) {
            userId = authorizerUserId;
            if (!userId) {
                return <Navigate to='/login' />
            }
        }
        dispatch(getUserProfileAsync(userId))
        dispatch(getUserStatusAsync(userId))
    }


    useEffect(() => {
        refreshProfile()
    }, [])

    useEffect(() => {
        refreshProfile()
    }, [params.userId])

    if (isAuth === false) return <Navigate to='/login' />

    if (!isOwner) {
        dispatch(setEditMode(false))
    }




    if (!profile) {
        return <div>прелоадер</div>
    }

    //todo remove then
    const onSubmit = (formData: valueType) => {
        dispatch(saveProfileAsync(formData))
    }

    const onMainFhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhotoAsync(e.target.files[0]));
            console.log(e.target.files[0])
        }
    }
















    return <>

        <div className={Style.global__wrapper}>


            <div className={Style.left__wrapper}>
                <div className={Style.profile__photos}>
                    {
                        profile?.photos.large
                            ? <img alt="profile" src={profile.photos.large} />
                            : <img src='https://sun9-72.userapi.com/impf/c840238/v840238583/52b6/kzTRJ0aSLtE.jpg?size=284x177&quality=96&sign=df6abc68d176ea2ef5a2c837df5a6e8d&c_uniq_tag=oPJlq0TKhhtcLx8kvT4-3yTePaM8iNwZKJMPONPUYcY&type=album' />
                    }
                </div>
                <div className={Style.status}>
                    <ProfileStatus isOwner={isOwner} status={status} />
                </div>
            </div>

            <div className={Style.right__wrapper}>


                <div className={Style.form__wrapper}>

                    <div className={cn(Style.ProfileData, { [Style.ProfileDataActive]: editMode })}>
                        <ProfileData isOwner={isOwner} />
                    </div>

                    <div className={cn(Style.ProfileDataForm,{ [Style.ProfileDataFormActive]: editMode } )}>
                        <ProfileDataForm onMainFhotoSelector={onMainFhotoSelector} isOwner={isOwner} onSubmit={onSubmit} />
                    </div>

                </div>
            </div>


        </div >
    </>
})


export default ProfileInfo;
