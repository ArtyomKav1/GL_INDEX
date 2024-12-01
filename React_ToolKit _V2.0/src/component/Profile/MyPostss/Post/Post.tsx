import React from 'react';
import Style from './Post.module.scss';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'src/app/hooks/hooks';
import { addLike, deletePost, removeLike } from 'src/app/slice/profileSlice';







type MyPostType = {
    postId: number
    message: string
    likesCount: number

}


const Post: React.FC<MyPostType> = React.memo((props) => {
    const dispatch = useAppDispatch()
    return (
        <div className={Style.item}>

            <div className={Style.phot__mes}>
                <img src={"https://sneg.top/uploads/posts/2023-06/1687990863_sneg-top-p-avatarka-siluet-muzhchini-vkontakte-55.png"} />
                <div className={Style.message}>{props.message}</div>
            </div>
            <div className={Style.like__delete}>

                <div className={Style.like__dislike}>
                    <LikeOutlined className={Style.like} onClick={()=>dispatch(addLike(props.postId))} />
                    {props.likesCount}
                    <DislikeOutlined className={Style.dislike} onClick={()=>dispatch(removeLike(props.postId))} />
                </div>

                <div className={Style.delete}>
                    <div onClick={()=>dispatch(deletePost(props.postId))} >DELET</div>
                </div>

            </div>

        </div>
    )
})

export default Post;