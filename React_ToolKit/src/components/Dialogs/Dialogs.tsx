import React, { Suspense } from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem.tsx";
import Message from "./Message/Message.tsx";
import { ActionsDialogs } from '../../redux/dialogs-reducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store.ts';
import { Field, Form, Formik, FormikProps, useFormikContext, } from 'formik';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { getDialogsPage } from '../../selectors/dialogs-selector.ts';
import { getIsAuth } from '../../selectors/auth-selector.ts';
import { ChatPage } from '../../Pages/Chat/ChatPage.tsx';



const Dialogs: React.FC = () => {


    const dialogsPage = useSelector(getDialogsPage)
    const isAuth = useSelector(getIsAuth)

    let dialogsElements = dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);



    let messagesElements = dialogsPage.messages.map(m => <Message message={m.message} />);
    if (isAuth === false) return <Navigate to='/login' />

    return (
        <div className={s.global__wrapper}>


            <div className={s.dialogs__wrapper}>
                <div>
                    <NavLink to={'/dialogs/chat'}>
                        <div className={s.dialogs__items} >
                            GLOBAL CHAT
                        </div >
                    </NavLink>
                </div>
                {dialogsElements}
            </div>



            <div className={s.massages__wrapper}>
                <Routes>
                    <Route path='chat' element={<ChatPage />} />
                </Routes>

            </div>


        </div>
    )
}
type initialValuesTypeErrors ={ 
    textMessages?: string
}


const DialogsReduxForm: React.FC = () => {
    const dispatch = useDispatch()
    const initialValues = { textMessages: '' }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    dispatch(ActionsDialogs.addNewMassages(values.textMessages))
                    setSubmitting(false);
                    resetForm();
                }}
                validate={values => {
                    const errors: initialValuesTypeErrors = {};
                    if (!values.textMessages) {
                        errors.textMessages = 'Required';
                    } else if (
                        values.textMessages.length > 100
                    ) {
                        errors.textMessages = 'Max length is 100 symbols';
                    }
                    return errors;
                }}
            >
                {({
                    resetForm,
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="Textarea"
                            name="textMessages"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.textMessages}
                            placeholder='Enter your message'
                        />
                        <div>{errors.textMessages}</div>

                        <button type="submit" disabled={isSubmitting}  >Submit</button>
                    </form >
                )}
            </Formik >
        </>
    )
}

export default Dialogs;

