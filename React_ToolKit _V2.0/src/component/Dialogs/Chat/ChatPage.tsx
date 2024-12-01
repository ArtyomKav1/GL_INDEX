import { useDispatch, useSelector } from "react-redux"
import { memo, useEffect, useRef, useState } from "react"
import React from "react"
import Style from './ChatPage.module.scss'
import { Formik } from "formik"
import { useAppDispatch } from "src/app/hooks/hooks"




export const ChatPage: React.FC = () => {
    return <>
        <Chat />
    </>
}
const Chat: React.FC = () => {
    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div className={Style.global__wrapper__chat}>
        {status === 'error' && <div>Some error occured. Please refresh the page</div>}
        <>
            <Massages />
            <AddMessagesForm />
        </>

    </div>
}






const Massages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {

        const element = e.currentTarget;
        console.log(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 600)
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 600) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {

        if (isAutoScroll) {

            console.log(messagesAnchorRef.current)
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])


    return <div>
        <div className={Style.scroll} onScroll={scrollHandler}>
            {messages.map((m) => <Massage key={m.id} messages={m} />)}
            <div ref={messagesAnchorRef}></div>
        </div>

    </div>
}
const Massage: React.FC<{ messages: ChatMessageAPIType }> = memo((messages) => {
    console.log(">>>>>>Message")
    return <>
        <div>
            <img src={messages.messages.photo} className={Style.avatar} /> <b>{messages.messages.userName}</b>
            <br />
            {messages.messages.message}
            <hr />
        </div>
    </>
})


type initialValuesTypeErrors ={ 
    textMessage?: string
}
const AddMessagesForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useAppDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)
    const sendMassageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    const initialValues = { textMessage: '' }
    return <>
        <div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    dispatch(sendMessage(values.textMessage))
                    resetForm();
                }}
                validate={values => {
                    const errors: initialValuesTypeErrors = {};
                    if (!values.textMessage) {
                        errors.textMessage = 'Required';
                    } else if (
                        values.textMessage.length > 100
                    ) {
                        errors.textMessage = 'Max length is 100 symbols';
                    }

                    return errors;
                }}
            >



                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={Style.wrapper}>
                            <div className={Style.input__wrapper}>
                                <input
                                    className={Style.item}
                                    type="Textarea"
                                    name="textMessage"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.textMessage}
                                />
                                <div>{errors.textMessage}</div>
                            </div>




                            <button className={Style.btn} type="submit" disabled={status !== 'ready'} >Send</button>
                        </div>

                    </form >
                )}


            </Formik >
            {/* <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMassageHandler}>Send</button>
            </div> */}
        </div>
    </>
}