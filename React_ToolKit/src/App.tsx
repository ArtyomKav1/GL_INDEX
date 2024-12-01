import React, { ComponentType, Suspense, useEffect } from 'react';
import { Provider, connect, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";



import { AppStateType, TDispatch } from "./redux/redux-store.ts";



import { initializedAppThunkCreator } from './redux/app-reducer.ts';
// const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer.tsx"))
// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'))
import { LaptopOutlined, NotificationOutlined, UserOutlined, MessageOutlined, MehOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink } from "react-router-dom";
import Preloader from './components/Preloader/Preloader.tsx';
// import { getInitialized } from './selectors/app-selector.ts';
import Profile from './components/Profile/Profile.tsx';
import { ChatPage } from './Pages/Chat/ChatPage.tsx';
import Users from './components/Users/Users.tsx';
import Dialogs from './components/Dialogs/Dialogs.tsx';
import s from './App.module.css'
import { loginThunkCreator, logoutThunkCreator } from './redux/auth-reducer.ts';
import { store } from './redux-store/store.ts';
import { useTypedSelectors } from './redux-store/store-hooks/useTypedSelectors.ts';
import { useLazyMeQuery, useLogoutMutation } from './redux-store/store-api/auth-api.ts';
import { setUserData } from './redux-store/store-slice/auth-slice.ts';
import { setInitializedSuccess } from './redux-store/store-slice/app-slice.ts';
import { LoginApp } from './components/login/Login.tsx';










const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['test1', 'test2', 'test3'].map((key) => ({
    key,
    label: `${key}`,
}));

// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(

//     (icon, index) => {
//         const key = String(index + 1);

//         return {
//             key: `sub${key}`,
//             icon: React.createElement(icon),
//             label: `subnav ${key}`,

//             children: new Array(4).fill(null).map((_, j) => {
//                 const subKey = index * 4 + j + 1;
//                 return {
//                     key: subKey,
//                     label: `option${subKey}`,
//                 };
//             }),
//         };
//     },
// );



// const [MeAPI, { isLoading: MeAPIisLoading, isSuccess: MeAPIisSuccess }] = useLazyMeQuery()
// const Me = async () => {
//     const isAuth = true
//     MeAPI()
//         .unwrap()
//         .then(res => {
//             if (res.resultCode === ResultCodeEnum.Success) {
//                 let { id, email, login } = res.data
//                 dispatch(setUserData({ id, email, login, isAuth }));
//             }
//         })
//         .catch((error) => console.log(error));
// };












export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}










const APP: React.FC = React.memo(() => {


    const [LogoutAPI, { isLoading: LogoutAPILoading, isSuccess: LogoutAPIisSuccess }] = useLogoutMutation()
    const Logout = async () => {
        LogoutAPI()
            .unwrap()
            .then(res => {
                const id = null
                const email = null
                const login = null
                const isAuth = false
                if (res.resultCode === ResultCodeEnum.Success) {
                    dispatch(setUserData({ id, email, login, isAuth }));
                }
                console.log(res)
            })
            .catch((error) => console.log(error));
    };


    // const [LogoutAPI, { isLoading: LogoutAPILoading, isSuccess: LogoutAPIisSuccess }] = useLogoutMutation()
    // const Logout = async () => {
    //     LogoutAPI()
    //         .unwrap()
    //         .then(res => {
    //             const id = null
    //             const email = null
    //             const login = null
    //             const isAuth = false
    //             if (res.resultCode === ResultCodeEnum.Success) {
    //                 dispatch(setUserData({ id, email, login, isAuth }));
    //             }
    //             console.log(res)
    //         })
    //         .catch((error) => console.log(error));
    // };

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


    const initializedAppThunkCreator = () => {

        let promise = Me();
        Promise.all([promise]).then(() => {
            dispatch(setInitializedSuccess());
        })
    }





    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const dispatch = useDispatch<TDispatch>()

    const isAuth = useTypedSelectors((state) => state.auth.isAuth)
    const profile = useTypedSelectors((state) => state.profile.profile)



    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured")
    }

    useEffect(() => {

        // initializedAppThunkCreator()
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
        return () => {
            window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
        }
    }, [])
    //TODO инициализация поломалась
    // const initialized = useTypedSelectors((state) => state.app.initialized)
    // if (!initialized) {
    //     return <Preloader />
    // }




    return <>
        <div className={s.wrapper}>


            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ display: 'flex', alignItems: 'center', }}>
                    <div className="demo-logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['1']}
                        items={[{
                            key: `1`,
                            icon: <MessageOutlined />,
                            label: <NavLink to="/profile" >Profile</NavLink>,
                        }, {
                            key: `2`,
                            icon: <MessageOutlined />,
                            label: <NavLink to="/profile" >login</NavLink>,
                        }
                        ]}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                    {isAuth
                        ? <div className={s.logout__wrapper} >
                            <div className={s.profile__photos}>
                                {
                                    profile?.photos.large
                                        ? <img className={s.profile__img} alt="profile" src={profile.photos.large} />
                                        : < UserOutlined style={{ color: 'white', marginRight: '10px', fontSize: '20px' }} />
                                }
                            </div>
                            <div className={s.logout} onClick={() => Logout()}>logout</div>
                        </div>
                        : <div className={s.login} > <NavLink to="/login" >login</NavLink></div>
                    }
                </Header>
                <Content style={{ padding: '0 48px', maxWidth: '1600px', width: '100%', margin: '0px auto', }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{ padding: '24px 0px 24px 0px', background: colorBgContainer, borderRadius: borderRadiusLG }}
                    >
                        <Sider style={{ background: colorBgContainer }} width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1',]}
                                defaultOpenKeys={['1',]}
                                style={{ height: '100%' }}
                                items={[{

                                    key: `1`,
                                    icon: < UserOutlined />,
                                    label: <NavLink to="/profile" >Profile</NavLink>,

                                },
                                {
                                    key: `2`,
                                    icon: <MessageOutlined />,
                                    label: <NavLink to="/dialogs" >Messages</NavLink>,
                                },
                                {
                                    key: `3`,
                                    icon: <MehOutlined />,
                                    label: <NavLink to="/users" >Users</NavLink>,
                                },
                                ]}
                            />
                        </Sider>
                        <Content style={{ padding: '0px 24px 0px 24px ', minHeight: '75vh' }}>




                            <Routes>
                                {/* <Route path='/dialogs' element={
                                    <Suspense fallback={"Loading"}>
                                        <Dialogs />
                                    </Suspense>
                                } >
                                    <Route path=':chat' element={
                                        <Suspense fallback={"Loading"}>
                                            <ChatPage />
                                        </Suspense>
                                    } />
                                </Route>
                                <Route path="/profile" element={
                                    <Suspense fallback={"Loading"}>
                                        <Profile />
                                    </Suspense>
                                }>
                                    <Route path=":userId" element={
                                        <Suspense fallback={"Loading"}>
                                            <Profile />
                                        </Suspense>} />
                                </Route> */}
                                <Route path='/users' element={<Users />} />
                                <Route path='/login' element={<LoginApp />} />
                                <Route path='/' element={<LoginApp />} />

                            </Routes>

                            {/* <Users /> */}

                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ©{new Date().getFullYear()} Created by Art
                </Footer>
            </Layout >
        </div >
    </>
})
let MainAPP: React.FC = () => {
    return <React.StrictMode>
        <BrowserRouter >
            <Provider store={store}>
                <APP />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
}

export default MainAPP;





