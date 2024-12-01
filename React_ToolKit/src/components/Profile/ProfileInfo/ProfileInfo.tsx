import React, { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Preloader/Preloader.tsx';
// import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks.tsx"
import { ProfileDataForm, ProfileData, valueType } from "./ProfileDataForm.tsx"
import { ProfileType, PhotosType } from '../../../types/types';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, TDispatch } from '../../../redux/redux-store.ts';
import {
    ActionsProfile, getUserProfileThunkCreator,
    getUserStatusThunkCreator,
    savePhotoThunkCreator, saveProfileThunkCreator,
    updateUserStatusThunkCreator
} from '../../../redux/profile-reducer.ts';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import ButtonInput from '../../Common/FormsControl/BTN/btn-input.jsx';
import { getIsAuth, getUserId } from '../../../selectors/auth-selector.ts';
import { getEditMode, getProfile, getStatus } from '../../../selectors/profile-selector.ts';
import cn from 'classnames'






const ProfileInfo: React.FC = React.memo(() => {


    const params = useParams()
    const editMode = useSelector(getEditMode)
    const profile = useSelector(getProfile)
    const status = useSelector(getStatus)
    const authorizerUserId = useSelector(getUserId)
    const isAuth = useSelector(getIsAuth)
    const dispatch = useDispatch<TDispatch>()
    const isOwner = !params.userId




    const refreshProfile = () => {

        
        let userId: number | undefined | null = +params.userId;


        if (!userId) {
            userId = authorizerUserId;
            // userId = 2;
            if (!userId) {
                return <Navigate to='/login' />
            }
        }

        dispatch(getUserProfileThunkCreator(userId))
        dispatch(getUserStatusThunkCreator(userId))
    }


    useEffect(() => {

        refreshProfile()
    }, [])
    useEffect(() => {
        refreshProfile()
    }, [params.userId])

    if (isAuth === false) return <Navigate to='/login' />







    if (!isOwner) {
        ActionsProfile.setEditMode(false)
    }
    if (!profile) {
        // debugger
        return <Preloader />
    }

    //todo remove then
    const onSubmit = (formData: valueType) => {
        dispatch(saveProfileThunkCreator(formData))
    }

    const setEditMode = (e: boolean) => {
        dispatch(ActionsProfile.setEditMode(e))
    }




    const onMainFhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhotoThunkCreator(e.target.files[0]));
            console.log(e.target.files[0])
        }
    }

    return <>

        <div className={s.global__wrapper}>


            <div className={s.left__wrapper}>
                <div className={s.profile__photos}>
                    {
                        profile?.photos.large
                            ? <img alt="profile" src={profile.photos.large} />
                            : <img src='https://sun9-72.userapi.com/impf/c840238/v840238583/52b6/kzTRJ0aSLtE.jpg?size=284x177&quality=96&sign=df6abc68d176ea2ef5a2c837df5a6e8d&c_uniq_tag=oPJlq0TKhhtcLx8kvT4-3yTePaM8iNwZKJMPONPUYcY&type=album' />
                    }
                </div>

                <div className={s.status}>
                    <ProfileStatusWithHooks isOwner={isOwner} status={status} updateUserStatus={updateUserStatusThunkCreator} />
                </div>
            </div>


            {/* <div className={s.right__wrapper}>
                <div className={s.form__wrapper}>
                    {editMode
                        ? <div className={s.ProfileDataForm}><ProfileDataForm onMainFhotoSelector={onMainFhotoSelector} isOwner={isOwner} onSubmit={onSubmit} setEditMode={() => { setEditMode(false) }} profile={profile} /></div>
                        : <div className={s.ProfileData}><ProfileData isOwner={isOwner} setEditMode={() => { setEditMode(true) }} profile={profile} /></div>}
                </div>
            </div> */}
            <div className={s.right__wrapper}>
                <div className={s.form__wrapper}>

                    <div className={s.ProfileData}><ProfileData isOwner={isOwner} setEditMode={() => { setEditMode(true) }} profile={profile} /></div>
                    <div className={cn({ [s.ProfileDataFormActive]: editMode }, s.ProfileDataForm)}>
                        <ProfileDataForm 
                        onMainFhotoSelector={onMainFhotoSelector} 
                        isOwner={isOwner} 
                        // onSubmit={onSubmit} 
                        setEditMode={() => { setEditMode(false) }} 
                        profile={profile} />
                    </div>
                </div>
            </div>


        </div >
    </>
})






export default ProfileInfo;


// const ProfileInfo: React.FC<ProfileInfoType> = (props) => {



//     if (!props.isOwner) {
//         props.setEditMode(false)
//     }
//     if (!props.profile) {
//         return <Preloader />
//     }
//     const onMainFhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files?.length) {
//             props.savePhoto(e.target.files[0]);
//         }
//     }
//     //todo remove then
//     const onSubmit = (formData: ProfileType) => {
//         props.saveProfile(formData)
//     }




//     return (
//         <div>
//             <div>
//                 <div className={s.descriptionBlock}>
//                     {
//                         props.profile.photos.large
//                             ? <img alt="profile" src={props.profile.photos.large} />
//                             : <img src='https://sun9-72.userapi.com/impf/c840238/v840238583/52b6/kzTRJ0aSLtE.jpg?size=284x177&quality=96&sign=df6abc68d176ea2ef5a2c837df5a6e8d&c_uniq_tag=oPJlq0TKhhtcLx8kvT4-3yTePaM8iNwZKJMPONPUYcY&type=album' />
//                     }
//                     {props.isOwner && <input type={"file"} onChange={onMainFhotoSelector} />}
//                     <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} />
//                 </div>
//             </div>
//             <div>
//                 {props.editMode
//                     ? <ProfileDataForm isOwner={props.isOwner} onSubmit={onSubmit} setEditMode={() => { props.setEditMode(false) }} profile={props.profile} />
//                     : <ProfileData isOwner={props.isOwner} setEditMode={() => { props.setEditMode(true) }} profile={props.profile} />}
//                 {/* initialValues={props.profile} */}
//             </div>
//         </div>
//     )
// }
