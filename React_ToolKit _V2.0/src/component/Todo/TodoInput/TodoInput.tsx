import React, { ChangeEventHandler, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Style from './TodoInput.module.scss'
import { useAppDispatch } from 'src/app/hooks/hooks';
import { addNewToDo, addNewToDoAsync, getTodoAsync } from 'src/app/slice/todoSlice';


const TodoInput: React.FC = () => {


    const dispatch = useAppDispatch()
    const [inputState, setInputState] = useState('')


    const controlMainInput = (e: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputState(e.currentTarget.value)
    }
    const submitInput = () => {
        if (inputState) {
            dispatch(addNewToDoAsync(inputState))
            setInputState("")
            // dispatch(getTodoAsync())
            // dispatch(addNewToDo(inputState))
        }
    }


    return (
        <div className={Style.wrapper}>

            <div className={Style.Delete}>
                <Button
                    variant="primary"
                    startIcon={<DeleteIcon />}
                    onClick={() => setInputState("")}>
                    Delete
                </Button>
            </div>


            <div>
                <TextField
                    id="standard-multiline-flexible"
                    label="TODO"
                    multiline
                    maxRows={3}
                    variant="standard"
                    value={inputState}
                    onChange={controlMainInput}
                    inputProps={{ maxLength: 100 }}
                />
            </div>


            <div className={Style.Send}>
                <Button
                    variant="primary"
                    endIcon={<SendIcon />}
                    onClick={submitInput}>
                    Send
                </Button>
            </div>




        </div>
    )
}


export default TodoInput;


