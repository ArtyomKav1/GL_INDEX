import React, { useState, useEffect, ChangeEvent } from 'react';
import s from './ProfileInfo.module.css';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'src/app/hooks/hooks';
import { updateUserStatusAsync } from 'src/app/slice/profileSlice';



type ProfileStatusProps = {
    status: string
    isOwner: boolean
}


const ProfileStatus: React.FC<ProfileStatusProps> = (props) => {
    const dispatch = useAppDispatch()
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateMode = () => {
        setEditMode(true)
    }
    const detivateMode = () => {
        setEditMode(false)

        dispatch(updateUserStatusAsync(status))
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
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


export default ProfileStatus;