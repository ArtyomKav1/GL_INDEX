import { Navigate } from "react-router-dom";
import React from 'react';
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";


let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as MapStatePropsType);

type MapStatePropsType = {
    isAuth: boolean
}
type DispatchPropsType = {
}


export function withAuthRedirect<WCP extends object>(WrappedComponent: React.ComponentType<WCP>) {


    const RedirectComponent: React.FC<DispatchPropsType & MapStatePropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (isAuth === false) return <Navigate to='/login' />
        return <WrappedComponent {...restProps as WCP} />

    }






    let ConnectAuthRedirectComponent = connect<MapStatePropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect, {})(RedirectComponent);


    return ConnectAuthRedirectComponent;
}