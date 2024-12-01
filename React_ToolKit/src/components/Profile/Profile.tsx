import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import s from './Profile.module.css'
import MyPosts from './MyPostss/MyPosts.tsx';
const Profile: React.FC = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.ProfileInfo}>
                <ProfileInfo />
            </div>
            <div className={s.MyPostsContainer}>
                <MyPosts/>
            </div>
        </div>
    )
}


export default Profile;







