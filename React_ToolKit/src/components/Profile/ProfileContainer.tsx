// import React, { ComponentType } from 'react';
// import Profile from "./Profile.tsx";
// import { connect, useDispatch, useSelector } from "react-redux";
// import { compose } from "redux"
// import {
//     getUserProfileThunkCreator,
//     updateUserStatusThunkCreator,
//     saveProfileThunkCreator,
//     getUserStatusThunkCreator,
//     Actions,
//     savePhotoThunkCreator,
//     ThunkType
// } from '../../redux/profile-reducer.ts';
// import { RouteComponentProps } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect.tsx';
// import { PhotosType, ProfileType } from '../../types/types.ts';
// import { AppStateType } from '../../redux/redux-store.ts';


// // костыль
// export function withRouter(Children) {
//     return (props) => {
//         const match = { params: useParams() };
//         return <Children {...props} match={match} />
//     }
// }




// type OwnPropsType = {
//     refreshProfile: () => void
//     isOwner: boolean
//     onMainFhotoSelector: (e: PhotosType) => void
//     onSubmit: (formData: {}) => void
// }
// type PathParamsType = {
//     userId: string
// }

// type MapStatePropsType = ReturnType<typeof mapStateToProps>
// type MapDispatchPropsType = {
//     getUserProfile: (userId: number | null) => void
//     updateUserStatus: (status: string) => void
//     getUserStatus: (userId: number | null) => void
//     savePhoto: (file: File) => void
//     saveProfile: (profileData: ProfileType) => void
//     setEditMode: (result: boolean) => void
// }
// export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps<PathParamsType>






// class ProfileContainer extends React.Component<PropsType> {
//     // refreshProfile() {
//     //     let userId: number | null = +this.props.match.params.userId;
//     //     if (!userId) {
//     //         userId = this.props.authorizerUserId;
//     //         if (!userId) {
//     //             //todo испроавить на Navigate
//     //             this.props.history.push("/login")
//     //         }
//     //     }
//     //     this.props.getUserProfile(userId);
//     //     this.props.getUserStatus(userId)
//     // }
//     componentDidMount() {
//         this.refreshProfile()
//     }
//     componentDidUpdate(prevProps: PropsType) {
//         if (this.props.match.params.userId != prevProps.match.params.userId) {
//             this.refreshProfile()
//         }
//     }

//     render() {
//         // if (!this.props.isAuth) return <Navigate to='/login' />
//         return (
//             <Profile {...this.props} isOwner={!this.props.match.params.userId} />

//         )
//     }

// }

// let mapStateToProps = (state: AppStateType) => ({
//     editMode: state.profilePage.editMode,
//     profile: state.profilePage.profile,
//     status: state.profilePage.status,
//     authorizerUserId: state.auth.userId,
//     isAuth: state.auth.isAuth
// })






// export default
//     compose<ComponentType>(
//         connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
//             mapStateToProps, {

//             getUserProfile: getUserProfileThunkCreator,
//             updateUserStatus: updateUserStatusThunkCreator,
//             getUserStatus: getUserStatusThunkCreator,
//             savePhoto: savePhotoThunkCreator,
//             saveProfile: saveProfileThunkCreator,

//             setEditMode: Actions.setEditMode
//         }),
//         withRouter,
//         withAuthRedirect
//     )(ProfileContainer)























// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps, { getUserProfile: getUserProfileThunkCreator })(WithUrlDataContainerComponent);