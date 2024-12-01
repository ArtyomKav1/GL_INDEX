import React, { useState, useEffect, ChangeEvent } from 'react';
import s from './ProfileInfo.module.css';
import { useDispatch } from 'react-redux';
import { TDispatch } from '../../../redux/redux-store';
import { AnyAction } from 'redux';
import { ThunkType } from '../../../redux/profile-reducer';


type ProfileStatusProps = {
    // onMainFhotoSelector: (e: ChangeEvent<HTMLInputElement>) => void
    updateUserStatus: (status: string) => ThunkType
    status: string
    isOwner: boolean
}


const ProfileStatusWithHooks: React.FC<ProfileStatusProps> = (props) => {
    const dispatch = useDispatch<TDispatch>()
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateMode = () => {
        setEditMode(true)
    }
    const detivateMode = () => {
        setEditMode(false)

        dispatch(props.updateUserStatus(status))
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div >
            {!editMode &&
                <div >

                    {props.isOwner
                        ? <span onDoubleClick={activateMode}>{props.status || "-------"}</span>
                        : <span>{props.status || "-------"}</span>
                    }
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur={detivateMode} autoFocus={true}
                        value={status} />
                </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;