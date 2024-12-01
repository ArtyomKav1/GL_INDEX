// import React from 'react';
// import s from "./FormsControls.module.css"
// import { WrappedFieldMetaProps } from 'redux-form';



// type FormControlParamsPropsType = {
//     meta: WrappedFieldMetaProps
//     // children: React.ReactNode
//     input: any
// }
// // что такое input



// export const Textarea: React.FC<FormControlParamsPropsType> = ({ input, meta, ...props }) => {
//     const showError = meta.touched && meta.error
//     return (
//         <div className={s.formControl + " " + (showError ? s.error : "")}>
//             <div>
//                 <textarea {...input} {...props} ></textarea>

//             </div>
//             {showError && <span>{meta.error}</span>}
//         </div>
//     )
// }

// export const Input: React.FC<FormControlParamsPropsType> = ({ input, meta, ...props }) => {
//     const showError = meta.touched && meta.error
//     return (
//         <div className={s.formControl + " " + (showError ? s.error : "")}>
//             <div>
//                 <input {...input} {...props} ></input>

//             </div>
//             {showError && <span>{meta.error}</span>}
//         </div>
//     )
// }




// // export const formControl = ({ input, meta, ...props }) => {
// //     const showError = meta.touched && meta.error
// //     return (
// //         <div className={s.fromControl + " " + (showError ? s.error : "")}>
// //             <div>
// //                 {props.child}

// //             </div>
// //             {showError && <span>{meta.error}</span>}
// //         </div>
// //     )
// // }

