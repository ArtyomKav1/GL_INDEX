import React, { ChangeEvent, useRef, useState } from 'react';
// import { ContactsType, PhotosType, ProfileType } from '../../../types/types';
// import s from '../../Common/FormsControl/FormsControls.module.css';
import Style from './ProfileDataForm.module.scss';
import { Formik } from 'formik';
import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'src/app/hooks/hooks';
import { saveProfileAsync, selectProfile, setEditMode } from 'src/app/slice/profileSlice';
import { ContactsType, ProfileType } from 'src/app/slice/TypeSlice';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import cn from 'classnames'
type ProfileDataFormProps = {
    isOwner: boolean
    setEditMode: () => void
    profile: ProfileType
    // saveProfileThunkCreator: (values: valueType) => void
    onMainFhotoSelector: (e: ChangeEvent<HTMLInputElement>) => void
}


export type valueType = {
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    contacts?: ContactsType
    AboutMe?: string
}

export const ProfileDataForm: React.FC<ProfileDataFormProps> = (props) => {


    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectProfile)

    const initialValues: valueType = {
        fullName: profile?.fullName,
        lookingForAJob: false,
        lookingForAJobDescription: profile?.lookingForAJobDescription,
        AboutMe: profile?.aboutMe
    }

    return (
        <>

            {/* {props.isOwner && <div> <Button onClick={() => dispatch(setEditMode(false))}>back</Button></div>} */}
            {props.isOwner && <div> <button className={Style.btn} onClick={() => dispatch(setEditMode(false))}>back</button></div>}


            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {

                    dispatch(saveProfileAsync(values))
                    setSubmitting(false);
                    dispatch(setEditMode(false))
                }}

                validate={values => {
                    const errors: valueType = {};
                    if (!values.fullName) {
                        errors.fullName = 'Required';
                    } else if (values.fullName.length > 100) {
                        errors.fullName = 'Max length is 100 symbols';
                    }


                    else if (!values.lookingForAJobDescription) {
                        errors.lookingForAJobDescription = 'Required';
                    } else if (values.lookingForAJobDescription.length > 100) {
                        errors.lookingForAJobDescription = 'Max length is 100 symbols';
                    }

                    else if (!values.AboutMe) {
                        errors.AboutMe = 'Required';
                    } else if (values.AboutMe.length > 100) {
                        errors.AboutMe = 'Max length is 100 symbols';
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

                        <div className={Style.global__block}>

                            <div className={Style.left__block}>


                                <input
                                    type="Textarea"
                                    name="fullName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName}
                                    placeholder='fullName'
                                />
                                <div className={Style.error}>{errors.fullName}</div>



                                <div className={Style.lookingForAJob}>lookingForAJob
                                    <input
                                        type="checkbox"
                                        name="lookingForAJob"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        // @ts-ignore
                                        value={values.lookingForAJob}
                                        placeholder='lookingForAJob'
                                    />
                                </div>






                                <input
                                    className={Style.input}
                                    type="Textarea"
                                    name="lookingForAJobDescription"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lookingForAJobDescription}
                                    placeholder='lookingForAJobDescription'
                                />
                                <div className={Style.error}>{errors.lookingForAJobDescription}</div>






                                <input
                                    className={Style.input}
                                    type="Textarea"
                                    name="AboutMe"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.AboutMe}
                                    placeholder='AboutMe'
                                />
                                <div className={Style.error}>{errors.AboutMe}</div>

                                <div className={Style.btn__input}>{props.isOwner && <input onChange={props.onMainFhotoSelector} />}</div>

                            </div>

                            <div className={Style.right__block}>
                                <div>contacts:</div>
                                {Object.keys(profile.contacts).map(key => {
                                    return <div className={Style.right__block__item} key={key}>
                                        <input
                                            type="Textarea"
                                            name="contacts"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder={key}
                                        />

                                    </div>
                                })}
                            </div>

                        </div>



                        <button className={Style.btn} type="submit" disabled={isSubmitting}  >submit</button>
                    </form >
                )}
            </Formik >
        </>
    )
}






const Contacts: React.FC<ContactProps> = ({ contactTitle, contactValue }) => {
    return <div><span>{contactTitle}:</span>{contactValue}</div>
}
type ProfileDataProps = {
    isOwner: boolean

}


export const ProfileData: React.FC<ProfileDataProps> = React.memo((props) => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectProfile)
    const [showContacts, setShowContacts] = useState(false)

    if (!profile) {
        return <div>прелоадер</div>
    }

    return <>
        {props.isOwner && <div> <Button onClick={() => dispatch(setEditMode(true))}>edit</Button></div>}
        <div className={Style.info__text}>

            <div><span>Full name:  </span>{profile.fullName}</div>
            <div><span>Looking for a job:  </span>{profile.lookingForAJob ? "YES" : "NO"}</div>
            <div><span>Looking for a job description:  </span>{profile.lookingForAJobDescription}</div>
            <div><span>About me:  </span>{profile.aboutMe}</div>

            <div>
                {/* <CSSTransition
                    nodeRef={formRef}
                    in={showContacts}
                    timeout={1200}
                    classNames="formProfile"

                > */}
                <div onClick={() => setShowContacts(true)}>Show more </div>


                <div className={cn(Style.list, { [Style.listActive]: showContacts })}>

                    {Object.keys(profile.contacts).map(key => {
                        return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                    })}
                    <div onClick={() => setShowContacts(false)}>X</div>

                </div>




            </div>
        </div>
    </>
})









type ProfileFormValueType = ProfileType
type ProfileFormOwnPropsType = {
    profile: ProfileType
    isOwner: boolean
    setEditMode: () => void
    // handleSubmit: () => void
    // error: string
}
type ContactProps = {
    contactTitle: string
    contactValue: string
}



























































// const DataForm1: React.FC<InjectedFormProps<ProfileFormValueType, ProfileFormOwnPropsType> & ProfileFormOwnPropsType> = (props) => {
//     return <>

//         {props.isOwner && <div><button onClick={props.setEditMode}>back</button></div>}
//         <form onSubmit={props.handleSubmit}>
//             {props.isOwner && <div><button >save</button></div>}
//             {props.error && <div className={s.formSummaryError}>
//                 {props.error}
//             </div>
//             }

//             <div>
//                 <div><span>fullName:</span><Field placeholder={'fullName'} name={'fullName'} component={Input} /></div>

//                 <div><span>lookingForAJob:</span> <Field type="checkbox" name={'lookingForAJob'} component={Input} /></div>
//                 <div><span>lookingForAJobDescription:</span><Field placeholder={'lookingForAJobDescription'} name={'lookingForAJobDescription'} component={Input} /></div>
//                 <div><span>AboutMe:</span><Field placeholder={'AboutMe'} name={'AboutMe'} component={Input} /></div>
//                 <div>
//                     <div>contacts:</div> {Object.keys(props.profile.contacts).map(key => { return <div key={key}><Field placeholder={key} name={'contacts.' + key} component={Input} /></div> })}
//                 </div>
//             </div>

//         </form>
//     </>
// }
// // export const ProfileDataForm = reduxForm<ProfileFormValueType, ProfileFormOwnPropsType>({ form: 'ProfileDataForm' })(DataForm)
