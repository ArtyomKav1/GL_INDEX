import React from 'react';
import s from './Post.module.css';
import postPhoto from '../../../../images/kot.png'
import { useDispatch } from 'react-redux';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { TDispatch } from '../../../../redux/redux-store';

import { AnyAction } from 'redux';
import { ActionsProfile } from '../../../../redux/profile-reducer.ts';



type MyPostType = {
    postId: number
    message: string
    likesCount: number

}


const Post: React.FC<MyPostType> = React.memo((props) => {
    const dispatch = useDispatch<TDispatch>()



    const del = () => {
        dispatch(ActionsProfile.deletePost(props.postId))
        console.log('del')
    }
    const addLike = () => {
        dispatch(ActionsProfile.addLike(props.postId))
        console.log('addLike')
    }
    const removeLike = () => {
        dispatch(ActionsProfile.removeLike(props.postId))
        console.log('removeLike')
    }



    return (
        <div className={s.item}>


            <div className={s.phot__mes}>
                <img src={postPhoto} />
                <div className={s.message}>{props.message}</div>
            </div>


            <div className={s.like__delete}>

                <div className={s.like__dislike}>
                    <LikeOutlined className={s.like} onClick={addLike} />

                    {props.likesCount}

                    <DislikeOutlined className={s.dislike} onClick={removeLike} />
                </div>


                <div className={s.delete}>
                    <div onClick={del}>DELET</div>
                </div>

            </div>




        </div>
    )
})

export default Post;