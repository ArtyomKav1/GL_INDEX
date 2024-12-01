
import React from 'react';
import { memo } from 'react';
import Style from './MyPosts.module.scss';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from 'src/app/hooks/hooks';
import { addNewPost, selectPosts } from 'src/app/slice/profileSlice';
import Post from './Post/Post';




const MyPosts: React.FC = memo(() => {
    const posts = useAppSelector(selectPosts)
    let postsElements = posts.map(p => <Post
        key={p.id}
        postId={p.id}
        message={p.message}
        likesCount={p.likesCount}
    />);

    return (
        <div className={Style.postsBlock}>

            <h3 className={Style.title}>My posts</h3>
            <MyPostsReduForm />

            <div className={Style.posts}>

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
    const dispatch = useAppDispatch()
    const initialValues: initialValuesType = { textPost: '' }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    dispatch(addNewPost(values.textPost))
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
                        <div  className={Style.input__form__wrapper}>
                            <input
                                className={Style.input__form}
                                type="Textarea"
                                name="textPost"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.textPost}
                                placeholder='Enter your textPost'
                            />
                            <div className={Style.error}>{errors.textPost}</div>

                        </div>


                        <button className={Style.BTN__submit} type="submit" disabled={isSubmitting}>submit</button>
                    </form >
                )}
            </Formik >
        </>
    )
}

export default MyPosts;
