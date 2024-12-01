
import React from 'react';
import { memo } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, TDispatch } from '../../../redux/redux-store.ts';
import { Formik } from 'formik';
import ButtonS from '../../Common/FormsControl/BTN/simple-btn.jsx';

import { getPosts } from '../../../selectors/profile-selector.ts';
import { ActionsProfile } from '../../../redux/profile-reducer.ts';



const MyPosts: React.FC = memo(() => {
    const posts = useSelector(getPosts)
    let postsElements = posts.map(p => <Post
        key={p.id}
        postId={p.id}
        message={p.message}
        likesCount={p.likesCount}
    />);

    return (
        <div className={s.postsBlock}>

            <h3>My posts</h3>
            <MyPostsReduForm />

            <div className={s.posts}>

                {postsElements}

            </div>
        </div>
    )
});














type initialValuesType = {
    textPost: string
}

type initialValuesTypeError = {
    textPost?: string
}





const MyPostsReduForm: React.FC = () => {
    const dispatch = useDispatch<TDispatch>()
    const initialValues: initialValuesType = { textPost: '' }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    dispatch(ActionsProfile.addNewPost(values.textPost))
                    setSubmitting(false);
                    resetForm();
                    console.log(values)
                }}
                validate={values => {
                    const errors: initialValuesTypeError = {};
                    if (!values.textPost) {
                        errors.textPost = 'Required';
                    } else if (
                        values.textPost.length > 100
                    ) {
                        errors.textPost = 'Max length is 100 symbols';
                    }
                    return errors;
                }}
            >
                {({
                    resetForm,
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="Textarea"
                            name="textPost"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.textPost}
                            placeholder='Enter your textPost'
                        />
                        <div style={{ color: 'red' }}>{errors.textPost}</div>

                        <ButtonS type="submit" disabled={isSubmitting}>submit</ButtonS>
                    </form >
                )}
            </Formik >
        </>
    )
}

export default MyPosts;




















