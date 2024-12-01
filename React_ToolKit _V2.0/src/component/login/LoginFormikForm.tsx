
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { authorizationtAsync, loginAsync } from 'src/app/slice/authSlice';
import { useAppDispatch } from "../../app/hooks/hooks"
import Style from "./LoginFormikForm.module.scss"
import { Button, Flex } from 'antd';
import { CSSTransition } from 'react-transition-group';
import "./../../index.css"









type initialValues = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string | null
}
type LoginRedxuFormPropsType = {
    captchaUrl: string | null
}


export const LoginFormikForm: React.FC<LoginRedxuFormPropsType> = (props) => {

    const dispatch = useAppDispatch()
    const initialValues: initialValues = { email: '', password: '', rememberMe: false, captcha: '' }


    // const [errorMail, setErrorMail] = useState(false)
    // const errorRef = useRef(null);


    const [placeholderMail, setPlaceholderMail] = useState('Enter your Mail')
    const [placeholderPassword, setplaceholderPassword] = useState('Enter your Password')

    return <>
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(loginAsync(values))
                setSubmitting(false);

            }}
            validate={values => {
                const errors: initialValues = {};
                // if (!values.email) {

                //     setErrorMail(true)
                //     console.log("true")
                //     errors.email = 'Required';

                // } else {
                //     setErrorMail(false)
                //     console.log("false")
                // }

                // if (values.email && values.email.length > 50) {
                //     setErrorMail(true)
                //     errors.email = 'Max length is 50 symbols';
                // } else {
                //     setErrorMail(false)
                // }
                // if (!values.email) {
                //     errors.email = 'Required';
                // } else if (values.email.length > 50) {
                //     errors.email = 'Max length is 50 symbols';
                // }
                if (!values.email) {
                    setPlaceholderMail('Fill out the Mail');
                } else if (!values.password) {
                    setplaceholderPassword('Fill out the password');
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
                                className={Style.login__input}
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder={placeholderMail}
                                              /* @ts-ignore */
                                maxlength = '50'
                            />


                    <input
                        className={Style.login__input}
                        type="Textarea"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder={placeholderPassword}
                            /* @ts-ignore */
                        maxlength = '50'
                    />




                    {props.captchaUrl && <img src={props.captchaUrl} />}
                    {props.captchaUrl &&
                        <div>

                            <input
                                className={Style.login__input}
                                type="Textarea"
                                name="captcha"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.captcha}
                                placeholder='Enter your code'
                            />

                        </div>
                    }

                    <div className={Style.checkbox} >
                        <div>Remember me</div>
                        <input
                            className={Style.login__input__checkBox}
                            type="checkbox"
                            name="rememberMe"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rememberMe}
                        />
                    </div>



                    <div className={Style.btn}>
                        <button className={Style.button__inv} type="submit">
                            <Button disabled={isSubmitting}>
                                Default Button
                            </Button>
                        </button>
                    </div>

                </form >
            )}
        </Formik >
    </>
}




// <CSSTransition
// nodeRef={errorRef}
// in={errorMail}
// timeout={1300}
// classNames="error"
// >
// <div className={Style.login__upper__wrapper}>
//     <input
//         className={Style.login__input}
//         type="email"
//         name="email"
//         onChange={handleChange}
//         onBlur={handleBlur}
//         value={values.email}
//         placeholder='Enter your Email'
//     />
//     {
        
//         <div ref={errorRef} className={Style.error}>
//             {errors.email}
//         </div>
//     }

// </div>
// </CSSTransition>

