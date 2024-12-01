import { Field, Form, Formik, FormikProps } from 'formik';
import React from "react";
import { FilterType } from '../../redux/users-reducer';
// import { getUsersFiletr } from '../../selectors/users-selectors.ts';
import { useSelector } from 'react-redux';
import s from "./UserSearchForm.module.css"
import { useTypedSelectors } from '../../redux-store/store-hooks/useTypedSelectors.ts';


type PropsType = {
    GetUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}

const UserSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useTypedSelectors((state) => state.users.filter)
    const pageSize = useTypedSelectors((state) => state.users.pageSize)
    const currentPage = 1
    return <>



        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: filter.friend }}
            onSubmit={(values, { setSubmitting }) => {

                props.GetUsers(currentPage, pageSize, values)
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
                    <div className={s.wrapper}>
                        <div className={s.input__wrapper}>
                            <input
                                className={s.item}
                                type="text"
                                name="term"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.term}
                            />

                        </div>


                        <select
                            name="friend"
                            className={s.item__select}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ display: 'block' }}
                        >
                            <option value="null" label="ALL" />
                            <option value="true" label="Only Followed" />
                            <option value="false" label="OnlyUnfollowed" />
                        </select>

                        <button className={s.btn} type="submit" disabled={isSubmitting} >Submit</button>
                    </div>

                </form >
            )}


        </Formik >





    </>
})
export default UserSearchForm;

