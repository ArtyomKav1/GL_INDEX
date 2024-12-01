// import React from 'react';
// import { connect } from "react-redux";
// import Header from './Header.tsx'
// import Preloader from '../Preloader/Preloader.js';
// import { logoutThunkCreator } from "../../redux/auth-reducer.ts";
// import { AppStateType } from '../../redux/redux-store.ts';



// type MapStatePropsType = {
//     isAuth: boolean
//     login: string | null
// }

// type MapDispatchPropsType = {
//     logout: ()=>void
// }

// type OwnPropsType = {
// }

// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
// class HeaderContainer extends React.Component<PropsType> {


//     render() {
//         return (
//             < Header {...this.props} />
//         )
//     }


// }
// const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
//     isAuth: state.auth.isAuth,
//     login: state.auth.login
// }
// )
// export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { logout: logoutThunkCreator })(HeaderContainer)