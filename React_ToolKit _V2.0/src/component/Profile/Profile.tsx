import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPostss/MyPosts';


import Style from './Profile.module.scss'


const Profile: React.FC = () => {
    return (
        <div className={Style.wrapper}>
            <div className={Style.ProfileInfo}>
                
                <ProfileInfo /> 
            </div>
            <div className={Style.MyPostsContainer}>
                <MyPosts/>
            </div>
        </div>
    )
}


export default Profile;







