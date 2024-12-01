import React, { ChangeEvent, useState } from 'react';
import { ContactsType, PhotosType, ProfileType } from '../../../types/types';
import s from '../../Common/FormsControl/FormsControls.module.css';
import w from './ProfileDataForm.module.css';
import { Field, Form, Formik, FormikProps, useFormikContext, } from 'formik';
import { useDispatch } from 'react-redux';
import { ActionsProfile, saveProfileThunkCreator } from '../../../redux/profile-reducer.ts';
import { Button } from 'antd'
import ButtonInput from '../../Common/FormsControl/BTN/btn-input.jsx';
import ButtonS from '../../Common/FormsControl/BTN/simple-btn.jsx';
import { TDispatch } from '../../../redux/redux-store.ts';


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


    const dispatch = useDispatch<TDispatch>()


    const initialValues: valueType = {
        fullName: props.profile.fullName,
        lookingForAJob: false,
        lookingForAJobDescription: props.profile.lookingForAJobDescription,
        AboutMe: props.profile.aboutMe
    }


    return (
        <>

            {props.isOwner && <div> <Button onClick={props.setEditMode}>back</Button></div>}


            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(saveProfileThunkCreator(values))
                    setSubmitting(false);
                    dispatch(ActionsProfile.setEditMode(false))
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

                        <div className={w.global__block}>

                            <div className={w.left__block}>


                                <input
                                    type="Textarea"
                                    name="fullName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName}
                                    placeholder='fullName'
                                />
                                <div className={w.error}>{errors.fullName}</div>



                                <div className={w.lookingForAJob}>lookingForAJob
                                    <input
                                        type="checkbox"
                                        name="lookingForAJob"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lookingForAJob}
                                        placeholder='lookingForAJob'
                                    />
                                </div>






                                <input
                                    className={w.input}
                                    type="Textarea"
                                    name="lookingForAJobDescription"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lookingForAJobDescription}
                                    placeholder='lookingForAJobDescription'
                                />
                                <div className={w.error}>{errors.lookingForAJobDescription}</div>






                                <input
                                    className={w.input}
                                    type="Textarea"
                                    name="AboutMe"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.AboutMe}
                                    placeholder='AboutMe'
                                />
                                <div className={w.error}>{errors.AboutMe}</div>

                                <div className={s.btn__input}>{props.isOwner && <ButtonInput text='выберите файл' onChangeFunction={props.onMainFhotoSelector} />}</div>

                            </div>

                            <div className={w.right__block}>
                                <div>contacts:</div>
                                {Object.keys(props.profile.contacts).map(key => {
                                    return <div key={key}>
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



                        <ButtonS type="submit" disabled={isSubmitting}  >submit</ButtonS>
                    </form >
                )}
            </Formik >
        </>
    )
}




























const Contacts: React.FC<ContactProps> = ({ contactTitle, contactValue }) => {
    return <div>{contactTitle}:{contactValue}</div>
}
type ProfileDataProps ={
    isOwner: boolean
    setEditMode: () => void
    profile: ProfileType

}


export const ProfileData: React.FC<ProfileDataProps> = React.memo((props) => {
    const [showContacts, setShowContacts] = useState(false)


    return <>
        {props.isOwner && <div> <Button onClick={props.setEditMode}>edit</Button></div>}
        {/* {props.isOwner && <div><button onClick={props.setEditMode}>edit</button></div>} */}
        <div>
            <div><span>Full name:  </span>{props.profile.fullName}</div>
            <div><span>Looking for a job:  </span>{props.profile.lookingForAJob ? "YES" : "NO"}</div>
            <div><span>Looking for a job description:  </span>{props.profile.lookingForAJobDescription}</div>
            <div><span>About me:  </span>{props.profile.aboutMe}</div>

            <div>
                <div onClick={() => setShowContacts(true)}>Contacts:↓ </div>
                {showContacts && <div>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
                    })}
                    <div onClick={() => setShowContacts(false)}>X</div>
                </div>}




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
