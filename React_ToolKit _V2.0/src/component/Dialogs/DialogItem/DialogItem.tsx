import React from 'react';
import Style from './../Dialogs.module.scss';
import { NavLink } from "react-router-dom";

type DialogItemType = {
    id: number
    name: string
}


const DialogItem: React.FC<DialogItemType> = (props) => {
    let path = "/dialogs/" + props.id;

    return <>
        <NavLink to={path}>
            <div className={Style.dialogs__items} >
                {props.name}
            </div >
        </NavLink>
    </>




}

export default DialogItem;