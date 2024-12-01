import React, { createRef, FC, useEffect } from "react"
import { createBrowserRouter, Route, Routes, useLocation, useOutlet } from "react-router-dom";
import Style from "./App.module.scss"
import Header from "./component/header/header"
import { LoginApp } from "./component/login/login";
import { useAppDispatch, useAppSelector } from "./app/hooks/hooks";
import { authorizationtAsync } from "./app/slice/authSlice";
import { initializedAppAsync, selectInitialized, selectStyleSwitcher } from "./app/slice/appSlice";
import Profile from "./component/Profile/Profile";
import cn from 'classnames'
import Users from "./component/Users/Users";
import Dialogs from "./component/Dialogs/Dialogs";
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import "./index.css"
import { routes } from ".";


const App: FC = () => {


  const dispatch = useAppDispatch()
  const StyleSwitcher = useAppSelector(selectStyleSwitcher)
  const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured")
  }

  useEffect(() => {
    dispatch(initializedAppAsync(1));
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
    return () => {
      window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
    }
  }, [])







  const initialized = useAppSelector(selectInitialized)
  if (!initialized) {
    return <div>прелоадер</div>
  }





  const location = useLocation()
  const currentOutlet = useOutlet()
  const { nodeRef } =routes.find((route) => route.path === location.pathname) ?? {}


  return (
    <>
      <div className={ cn(Style.global__wrapper, {[Style.global__wrapper__active]: !StyleSwitcher} )}>

        <Header />

        <div className={Style.main__wrapper}>
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              /* @ts-ignore */
              nodeRef={nodeRef}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              {(state) => (
                /* @ts-ignore */
                <div ref={nodeRef} className="page">
                  {currentOutlet}
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>

        <div className={Style.footer__wrapper}></div>
      </div>

    </>
  )
}

export default App








{/* 
        <div className={Style.main__wrapper}>
          <Routes>
              <Route path='/login' element={<LoginApp />} />
            <Route path='/users' element={<Users />} />
            <Route path="/profile" element={<Profile />}>
              <Route path=":userId" element={<Profile />} />
            </Route>
            <Route path='/dialogs' element={<Dialogs />} />
          </Routes>
        </div>  */}
