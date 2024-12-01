import React from 'react';
import s from './btn-input.module.css'







const ButtonInput = (props) => {
    return <>
        <div className={s.input__file}>
            <input type={"file"} name="file" onChange={props.onChangeFunction} />
            <span className={s.input__file__btn}>{props.text}</span>
        </div>
    </>
}
export default ButtonInput