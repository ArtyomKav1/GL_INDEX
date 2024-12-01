import { Navigate } from "react-router-dom"
import { useAppSelector } from "src/app/hooks/hooks"
import { selectcaptchaUrls, selectisAuth } from "src/app/slice/authSlice"
import Style from './login.module.scss'
import { LoginFormikForm } from "./LoginFormikForm"



export const LoginApp: React.FC = () => {

    const isAuth = useAppSelector(selectisAuth)
    const captchaUrl = useAppSelector(selectcaptchaUrls)
    if (isAuth) { return <Navigate to='/profile' /> }

    return <>
        <div className={Style.global__wrapper}>
            <div className={Style.wrapper} >
                <h1>login</h1>
                <LoginFormikForm captchaUrl={captchaUrl} />
            </div>
        </div >
    </>
}


