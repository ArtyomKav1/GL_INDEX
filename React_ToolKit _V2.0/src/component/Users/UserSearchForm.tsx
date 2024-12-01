import { Field, Form, Formik, FormikProps } from 'formik';
import React from "react";

import { useSelector } from 'react-redux';
import Style from "./UserSearchForm.module.scss"
import { useAppDispatch, useAppSelector } from 'src/app/hooks/hooks';
import { selectFilter } from 'src/app/slice/userSlice';
import { FilterType } from 'src/app/slice/TypeSlice';


type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UserSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useAppSelector(selectFilter)

    return <>



        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: filter.friend }}
            onSubmit={(values, { setSubmitting }) => {

                props.onFilterChanged(values)
                setSubmitting(false);
            }}
            // validate={values => {
            //     const errors = {};
            //     if (!values.term) {
            //         errors.term = 'Required';
            //     } else if (values.term.length > 100) {
            //         errors.term = 'Max length is 100 symbols';
            //     }

            //     return errors;
            // }}
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
                                type="text"
                                name="term"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.term}
                            />
                            
                        </div>


                        <select
                            name="friend"
                            className={Style.item__select}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ display: 'block' }}
                        >
                            <option value="null" label="ALL" />
                            <option value="true" label="Only Followed" />
                            <option value="false" label="Only Unfollowed" />
                        </select>

                        <button className={Style.btn} type="submit" disabled={isSubmitting} >Submit</button>
                    </div>

                </form >
            )}


        </Formik >





    </>
})
export default UserSearchForm;

