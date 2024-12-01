import { useAppDispatch, useAppSelector } from "src/app/hooks/hooks";
import Style from "./header.module.scss"
import { NavLink } from "react-router-dom";
import { logoutAsync, selectLogin, selectisAuth } from "src/app/slice/authSlice";
import { selectProfile } from "src/app/slice/profileSlice";
import { selectStyleSwitcher, setStyleSwitcher } from "src/app/slice/appSlice";
import { useTheme } from "src/app/hooks/use-theme";


const Header = () => {



    const Login = useAppSelector(selectLogin)
    const profile = useAppSelector(selectProfile)
    const isAuth = useAppSelector(selectisAuth)
    const styleSwitcher = useAppSelector(selectStyleSwitcher)
    const dispatch = useAppDispatch()

    return <>
        <div className={Style.header__wrapper}>


            <div className={Style.header__left__wrapper}>
                <div className={Style.header__left__item}><NavLink to="/" >Main</NavLink></div>
                <div className={Style.header__left__item}><NavLink to="/profile" >Profile</NavLink></div>
                <div className={Style.header__left__item}><NavLink to="/users" >Users</NavLink></div>
                <div className={Style.header__left__item}><NavLink to="/dialogs" >Dialogs</NavLink></div>
                <div className={Style.header__left__item}><NavLink to="/todo" >TO DO</NavLink></div>
            </div>


            <div className={Style.header__right__wrapper}>
                <div className={Style.header__right__item}>
                    <button className={Style.header__StyleSwitcher} onClick={() => dispatch(setStyleSwitcher())}>
                        {
                            styleSwitcher
                                ? <div>light</div>
                                : <div>dark</div>
                        }
                    </button>
                    
                </div>


                <div className={Style.header__right__item}>
                    {isAuth
                        ? <button className={Style.header__right__item__loguot} onClick={() => dispatch(logoutAsync(1))}><NavLink to="/login" >Logout</NavLink></button>
                        : <NavLink to="/login" >Login</NavLink>
                    }
                </div>


                <div className={Style.header__right__item}>
                    <NavLink to="/profile" >
                        {
                            profile?.photos.large
                                ? <img alt="profile" src={profile.photos.large} />
                                : <img src='https://sun1-98.userapi.com/s/v1/ig2/LfnoBVxZojzcr9YVqswNnZXMXj630tCPHJUdi94oKLPCrAyybhv-2c0M9in5Pxqq0Rli1dkZVNJlMc3ySF5pLGey.jpg?size=1800x1800&quality=95&crop=0,0,1800,1800&ava=1' />
                        }
                    </NavLink>
                </div>
                <div className={Style.header__right__item}><NavLink to="/profile" >{Login}</NavLink></div>
            </div>
        </div>
    </>
};

export default Header;


