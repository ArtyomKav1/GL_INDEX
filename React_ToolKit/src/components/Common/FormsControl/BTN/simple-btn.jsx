import React from 'react';
import s from './simple-btn.module.css'






const ButtonS = ({children, ...props}) => {
    return <>
        <button {...props} className={s.btn}>{children}</button>
    </>
}
export default ButtonS