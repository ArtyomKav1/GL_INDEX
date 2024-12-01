import React, { useEffect } from 'react';
import Style from './MainTodo.module.scss'
import TodoItem from './TodoItem/TodoItem';
import TodoInput from './TodoInput/TodoInput';
import { useAppDispatch, useAppSelector } from 'src/app/hooks/hooks';
import { getTodoAsync, selectTaskItem } from 'src/app/slice/todoSlice';
import { useDrag } from 'react-dnd'





const MainTodo: React.FC = () => {


    const taskItem = useAppSelector(selectTaskItem)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTodoAsync())
    }, [])





    return (
        <div className={Style.wrapper}>


            <div className={Style.wrapper__todo_input}>
                <TodoInput />
            </div>


            {/* <div className={Style.wrapper__todo_item}>

                {

                    taskItem.map(t => (
                        <TodoItem
                            key={t.id}
                            idItem={t.id}
                            title={t.title}

                        />
                    ))
                }

            </div> */}


        </div>
    )
}


export default MainTodo;







