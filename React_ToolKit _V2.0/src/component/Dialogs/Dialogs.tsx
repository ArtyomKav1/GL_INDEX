import React, { Suspense } from 'react';
import Style from './Dialogs.module.scss';
import { Formik} from 'formik';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks/hooks';
import { selectisAuth } from 'src/app/slice/authSlice';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { addNewMessages, selectisDialogs } from 'src/app/slice/dialogsSlice';
import { ChatPage } from './Chat/ChatPage';





const Dialogs: React.FC = () => {


    const dialogsPage = useAppSelector(selectisDialogs)
    const isAuth = useAppSelector(selectisAuth)

    let dialogsElements = dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);



    let messagesElements = dialogsPage.messages.map(m => <Message message={m.message} />);
    if (isAuth === false) return <Navigate to='/login' />

    return (
        <div className={Style.global__wrapper}>


            <div className={Style.dialogs__wrapper}>
                <div>
                    <NavLink to={'/dialogs/chat'}>
                        <div className={Style.dialogs__items} >
                            GLOBAL CHAT
                        </div >
                    </NavLink>
                </div>
                {dialogsElements}
            </div>


//TODO сделать чат 
            {/* <div className={Style.massages__wrapper}>
                <Routes>
                    <Route path='chat' element={<ChatPage />} />
                </Routes>

            </div> */}


        </div>
    )
}
type initialValuesTypeErrors ={ 
    textMessages?: string
}


const DialogsReduxForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const initialValues = { textMessages: '' }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    dispatch(addNewMessages(values.textMessages))
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

