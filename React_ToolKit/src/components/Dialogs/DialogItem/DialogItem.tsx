import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from "react-router-dom";

type DialogItemType = {
    id: number
    name: string
}


const DialogItem: React.FC<DialogItemType> = (props) => {
    let path = "/dialogs/" + props.id;

    return <>
        <NavLink to={path}>
            <div className={s.dialogs__items} >
                {props.name}
            </div >
        </NavLink>
    </>




}

export default DialogItem;