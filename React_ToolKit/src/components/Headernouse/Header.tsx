// import React from 'react';
// import s from './Header.module.css';
// import { NavLink } from 'react-router-dom'


// type Header = {
//     isAuth: boolean
//     login: string | null
//     logout: () => void
// }



// const Header: React.FC<Header> = (props) => {
//     return <header className={s.header}>
//         <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
//         <div className={s.loginBlock}>



//             {props.isAuth
//                 ? <div>
//                     {props.login}
//                     <button className={s.btn__logout} onClick={props.logout}>LOGOUT</button>
//                 </div>
//                 : <NavLink to={'/login'}>Login</NavLink>
//             }




//         </div>
//     </header>
// }

// export default Header;