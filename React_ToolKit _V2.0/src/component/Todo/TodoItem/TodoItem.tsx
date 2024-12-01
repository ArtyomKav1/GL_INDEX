import * as React from 'react';
import TextField from '@mui/material/TextField';
import Style from './TodoItem.module.scss'
import Checkbox from '@mui/material/Checkbox';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks/hooks';
import { addNewTaskAsync, changeTitleTodoAsync, deletTaskAsync, deletToDoAsync, getTaskAsync, selecttasks, updateTaskAsync } from 'src/app/slice/todoSlice';
import DeleteIcon from '@mui/icons-material/Delete';




type TodoItemPropsType = {
    idItem: number
    title: string
    tasks: {
        title: string
        id: number
        Progress: boolean
    }
}






const TodoItem: React.FC<TodoItemPropsType> = (props) => {


    const [alignment, setAlignment] = React.useState('web');
    const [inputState, setInputState] = useState('')
    const [filterTask, setFilterTask] = useState('ALL')
    const [changeTatleState, setChangeTatleState] = useState('')
    const [inputEditMode, setInputEditMode] = useState(false)
    const dispatch = useAppDispatch()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



    useEffect(() => {

        dispatch(getTaskAsync(props.idItem))
    }, [])


    let GlobalTasks = useAppSelector(selecttasks)
    let tasks = GlobalTasks[props.idItem]


    if (filterTask === "Done") {
        tasks = tasks.filter((t) => t.status === 1)
    }
    if (filterTask === "Not completed") {
        tasks = tasks.filter((t) => t.status === 0)

    }



    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };
    const deletTodo = () => {
        dispatch(deletToDoAsync(props.idItem))
        // dispatch(deletTodos(props.idItem))
    }




    const controChangeTitleTodo = (e: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>) => {
        setChangeTatleState(e.currentTarget.value)
    }

    const changeTitleTodoSubmit = () => {
        dispatch(changeTitleTodoAsync({ id: props.idItem, title: changeTatleState }))
        setInputEditMode(false)
    }




    const controlMainInput = (e: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputState(e.currentTarget.value)
    }

    const submitInput = () => {
        if (inputState) {
            dispatch(addNewTaskAsync({ id: props.idItem, title: inputState }))
            setInputState("")
        }
    }
    const deletTask = (id: string) => {
        dispatch(deletTaskAsync({
            idToDo: props.idItem,
            idTask: id
        }))
    }


    const changeStatusProgress = (id: string) => {

        dispatch(changeProgress({
            todoId: props.idItem,
            taskID: id,
        }))

    }


    // const changeStatusProgress = (id: string) => {
    //     let task = tasks.filter((t)=> t.id === id)
    //     let CheckboxStatus = 1
    //     if(!!task.status) CheckboxStatus = 0



    //     dispatch(updateTaskAsync({
    //         todoId: props.idItem,
    //         taskID: id,
    //         item: {
    //             ...task[0],   
    //             status: CheckboxStatus
    //         }
    //     }))

    // }
















    return (
        <div className={Style.wrapper}>


            <div onDoubleClick={()=> setInputEditMode(true)} className={Style.title}>
                {
                    inputEditMode
                        ? <div>
                            <TextField
                                id="standard-multiline-flexible"
                                label="New task"
                                multiline
                                maxRows={2}
                                variant="standard"
                                value={changeTatleState}
                                onChange={controChangeTitleTodo}
                                onBlur={changeTitleTodoSubmit}
                            />
                        </div>
                        : <div>{props.title}</div>

                }


                <div className={Style.delet__icon} onClick={deletTodo}>
                    <DeleteIcon />
                </div>
            </div>


            <div className={Style.input}>
                <TextField
                    id="standard-multiline-flexible"
                    label="New task"
                    multiline
                    maxRows={2}
                    variant="standard"
                    value={inputState}
                    onChange={controlMainInput}
                />
                <div className={Style.submit}>
                    <Button variant="primary" startIcon={<AddIcon />} onClick={submitInput}>
                    </Button>
                </div>
            </div>


            <div className={Style.items}>

                {tasks
                    ? <div> {
                        tasks.map(v => (
                            <div key={v.id} className={Style.item} >

                                <div className={v.Progress ? '' : Style.item__text}>
                                    {v.title}
                                </div>

                                <div>
                                    <Checkbox {...label}
                                        defaultChecked color="success"
                                        // checked={v.Progress}
                                        onClick={() => changeStatusProgress(v.id)} />
                                </div>

                                <div className={Style.delet__icon} onClick={() => deletTask(v.id)}>
                                    <DeleteIcon />
                                </div>

                            </div>
                        ))
                    }</div>
                    : <div>пусто</div>
                }






            </div>


            <div className={Style.footer}>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton onClick={() => setFilterTask("ALL")} value="web">ALL</ToggleButton>
                    <ToggleButton onClick={() => setFilterTask("Done")} value="android">Done</ToggleButton>
                    <ToggleButton onClick={() => setFilterTask("Not completed")} value="ios">Not completed</ToggleButton>
                </ToggleButtonGroup>
            </div>


        </div>
    )

}


export default TodoItem;


function changeProgress(arg0: { todoId: number; taskID: string; }): any {
    throw new Error('Function not implemented.');
}

