import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { loginThunkCreator } from '../../redux/auth-reducer.ts';
import s from './login.module.css';
import { AppStateType, TDispatch } from '../../redux/redux-store.ts';
import { Formik } from 'formik';
import ButtonS from '../Common/FormsControl/BTN/simple-btn.jsx';
// import { getCaptchaUrl, getIsAuth } from '../../selectors/auth-selector.ts';
import { useTypedSelectors } from '../../redux-store/store-hooks/useTypedSelectors.ts';
import { useLazyGetCaptchaUrlQuery, useLazyMeQuery, useLoginMutation } from '../../redux-store/store-api/auth-api.ts';
import { setCaptchaUrl, setUserData } from '../../redux-store/store-slice/auth-slice.ts';




export const LoginApp: React.FC = () => {

    const isAuth = useTypedSelectors((state) => state.auth.isAuth)
    const captchaUrl = useTypedSelectors((state) => state.auth.captchaUrl)


    if (isAuth) { return <Navigate to='/profile' /> }
    return <>
        <div className={s.global__wrapper}>
            <div className={s.wrapper} >
                <h1>login</h1>
                <LoginRedxuForm captchaUrl={captchaUrl} />
            </div>

        </div >

    </>
}



type initialValues = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type LoginRedxuFormPropsType = {
    captchaUrl: string | null
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}


const LoginRedxuForm: React.FC<LoginRedxuFormPropsType> = (props) => {









    const [MeAPI, { isLoading: MeAPIisLoading, isSuccess: MeAPIisSuccess }] = useLazyMeQuery()
    const Me = async () => {
        const dispatch = useDispatch<TDispatch>()
        const isAuth = true
        MeAPI()
            .unwrap()
            .then(res => {
                if (res.resultCode === ResultCodeEnum.Success) {
                    let { id, email, login } = res.data
                    dispatch(setUserData({ id, email, login, isAuth }));
                }
            })
            .catch((error) => console.log(error));
    };



    const [GetCaptchaUrlAPI, { isLoading: GetCaptchaUrlisLoading, isSuccess: GetCaptchaUrlisSuccess }] = useLazyGetCaptchaUrlQuery()
    const GetCaptchaUrl = async () => {
        const dispatch = useDispatch<TDispatch>()
        GetCaptchaUrlAPI()
            .unwrap()
            .then(res => {
                const captchaUrl = res.url
                dispatch(setCaptchaUrl(captchaUrl))
            })
            .catch((error) => console.log(error));
    };



    
    const [LoginAPI, { isLoading: LoginAPIisLoading, isSuccess: LoginAPIisSuccess }] = useLoginMutation()
    const Login = async (email: string, password: string, rememberMe: boolean, captchaUrl: string | null) => {
        const dispatch = useDispatch<TDispatch>()
        LoginAPI({ email, password, rememberMe, captchaUrl })
            .unwrap()
            .then(res => {
                if (res.resultCode === ResultCodeEnum.Success) {
                    Me()
                } else {
                    if (res.resultCode === ResultCodeEnum.CaptchaIsRequired) {
                        GetCaptchaUrl()
                    }
                    let message = res.messages.length > 0 ? res.messages[0] : "Some error"
                    // @ts-ignore
                    dispatch(stopSubmit("login", { _error: message }));
                }
            })
            .catch((error) => console.log(error));
    };

















    const dispatch = useDispatch<TDispatch>()
    const initialValues: initialValues = { email: '', password: '', rememberMe: false, captcha: '' }

    return <>
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
                Login(values.email, values.password, values.rememberMe, values.captcha)
                // dispatch(saveProfileThunkCreator(values))
                // setSubmitting(false);
                // console.log(values)
            }}
        // validate={values => {
        //     const errors = {};
        //     if (!values.textMessages) {
        //         errors.textMessages = 'Required';
        //     } else if (
        //         values.textMessages.length > 100
        //     ) {
        //         errors.textMessages = 'Max length is 100 symbols';
        //     }
        //     return errors;
        // }}
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
                        className={s.login__input}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder='Enter your Email'
                    />
                    <div>{errors.email}</div>


                    <input
                        className={s.login__input}
                        type="Textarea"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder='Enter your Password'
                    />
                    <div>{errors.password}</div>



                    {props.captchaUrl && <img src={props.captchaUrl} />}
                    {props.captchaUrl &&
                        <div>

                            <input
                                className={s.login__input}
                                type="Textarea"
                                name="captcha"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.captcha}
                                placeholder='Enter your message'
                            />
                            <div>{errors.captcha}</div>
                        </div>
                    }

                    <div className={s.checkbox} >
                        <div>Remember me</div>
                        <input
                            className={s.login__input__checkBox}
                            type="checkbox"
                            name="rememberMe"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rememberMe}

                        />
                        <div>{errors.rememberMe}</div>

                    </div>



                    <div className={s.btn}>
                        <ButtonS type="submit" disabled={isSubmitting} >submit</ButtonS>
                    </div>

                </form >
            )}
        </Formik >
    </>
}













// const onSubmit = (formData: LoginFormValueType) => {
//     dispatch(loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha))
// }


// const LoginRedxuForm = reduxForm<LoginFormValueType, LoginFormOwnPropsType>({ form: 'login' })(LoginForm)
// type LoginFormValueType = {
//     email: string
//     password: string
//     rememberMe: boolean
//     captcha: string | null
// }
// type LoginFormOwnPropsType = {
//     captchaUrl: string | null
// }



// const LoginForm: React.FC<InjectedFormProps<LoginFormValueType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {
//     const maxlength30 = maxlengthCreator(30)


//     return <>
//         <form onSubmit={props.handleSubmit}>
//             <div>
//                 <Field placeholder={'email'} name={'email'} component={Input} validate={[requiredField, maxlength30]} />
//             </div>
//             <div>
//                 <Field placeholder={'password'} name={'password'} type={"password"} component={Input} validate={[requiredField, maxlength30]} />
//             </div>
//             <div>
//                 <Field type="checkbox" name={'rememberMe'} component={Input} /> remember me
//             </div>


//             {props.error && <div className={s.formSummaryError}>
//                 {props.error}
//             </div>}


//             {props.captchaUrl && <img src={props.captchaUrl} />}
//             {props.captchaUrl && <Field
//                 placeholder={'captcha'}
//                 name={'captcha'}
//                 component={Input}
//                 validate={[requiredField,
//                     maxlength30]} />
//             }


//             <button>Login</button>
//         </form >
//     </>
// }