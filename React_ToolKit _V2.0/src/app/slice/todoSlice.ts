import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./createAppSlice"
import { v4 as uuidv4 } from 'uuid';
import { todoAPI } from "../apiOld/api";



const initialState = {
    taskItem: [],
    tasks: {},
}



export const todoSlice = createAppSlice({
    name: "todo",
    initialState,
    reducers: create => ({






        // addNewToDo: create.reducer(
        //     (state, action: PayloadAction<string>) => {

        //         let newToDo = {
        //             idItem: uuidv4(),
        //             title: action.payload,
        //             tasks: [
        //                 {
        //                     title: 'task1',
        //                     id: uuidv4(),
        //                     Progress: false,
        //                 }
        //             ]

        //         }
        //         state.taskItem = [...state.taskItem, newToDo]
        //     }
        // ),
        addNewTask: create.reducer(
            (state, action: PayloadAction<string>) => {

                let newTask = {
                    title: action.payload.inputState,
                    id: uuidv4(),
                    Progress: false,
                }

                state.taskItem.map(todo => {
                    if (todo.idItem === action.payload.idItem) {
                        todo.tasks.push(newTask)

                    }
                })

            }
        ),
        // changeProgress: create.reducer(
        //     (state, action: PayloadAction<string>) => {

        //         state.taskItem.map(todo => {
        //             if (todo.idItem === action.payload.todoId) {
        //                 todo.tasks.map(task => {

        //                     if (task.id === action.payload.taskID) {

        //                         task.Progress = !task.Progress

        //                     }
        //                 })

        //             }
        //         })
        //     }
        // ),
        deletTasks: create.reducer(
            (state, action: any) => {

                state.taskItem.map(todo => {

                    if (todo.idItem === action.payload.todoId) {

                        todo.tasks = todo.tasks.filter((t) => t.id !== action.payload.taskID)

                    }
                })
            }
        ),
        // deletTodos: create.reducer(
        //     (state, action: any) => {

        //         state.taskItem = state.taskItem.filter((t) => t.idItem !== action.payload)



        //     }
        // ),
        setTodo: create.reducer(
            (state, action: any) => {
                state.taskItem = action.payload
            }
        ),


        getTodoAsync: create.asyncThunk(
            async (_, { dispatch }) => {
                let response = await todoAPI.getToDoAPI()
                dispatch(setTodo(response.data));
            },
        ),

        addNewToDoAsync: create.asyncThunk(
            async (title, { dispatch, getState }) => {

                let preresponse = await todoAPI.addToDoAPI(title)
                if (preresponse.data.resultCode === 0) {
                    let response = await todoAPI.getToDoAPI()
                    dispatch(setTodo(response.data));
                }

            },
        ),
        deletToDoAsync: create.asyncThunk(
            async (id, { dispatch, getState }) => {
                //TODO возможно можно упростить
                let preresponse = await todoAPI.deletTodo(id)
                if (preresponse.data.resultCode === 0) {
                    let response = await todoAPI.getToDoAPI()
                    dispatch(setTodo(response.data));
                }

            },
        ),


        setTask: create.reducer(
            (state, action: any) => {
                state.tasks[action.payload.id] = action.payload.item.items
            }
        ),


        getTaskAsync: create.asyncThunk(
            async (id, { dispatch }) => {
                
                let response = await todoAPI.getTaskAPI(id)
                dispatch(setTask({id, item: response.data}));
                
            },
        ),



        addNewTaskAsync: create.asyncThunk(
            async (data, { dispatch, getState }) => {

                let preresponse = await todoAPI.addTaskAPI(data.id, data.title)
                let id = data.id
                if (preresponse.data.resultCode === 0) {
                    let response = await todoAPI.getTaskAPI(data.id)
                    dispatch(setTask({id, item: response.data}));
                }

            },
        ),
        deletTaskAsync: create.asyncThunk(
            async (data, { dispatch }) => {

                let preresponse = await todoAPI.deletTask(data.idToDo, data.idTask)
                let id = data.idToDo
                if (preresponse.data.resultCode === 0) {
                    let response = await todoAPI.getTaskAPI(data.idToDo)
                    dispatch(setTask({id, item: response.data}));
                }

            },
        ),
        // updateTaskAsync: create.asyncThunk(
        //     async (data, { dispatch }) => {



        //         let preresponse = await todoAPI.updateTaskAPI(data.todoId, data.taskID, data.item)
        //         let id = data.idToDo
        //         if (preresponse.data.resultCode === 0) {
        //             let response = await todoAPI.getTaskAPI(data.idToDo)
        //             dispatch(setTask({id, item: response.data}));
        //         }

        //     },
        // ),
        changeTitleTodoAsync: create.asyncThunk(
            async (data, { dispatch }) => {


                let preresponse = await todoAPI.changeTitleTodo(data.id, data.title)
                if (preresponse.data.resultCode === 0) {
                    let response = await todoAPI.getToDoAPI()
                    dispatch(setTodo(response.data));
                }


            },
        ),










    }),



    selectors: {
        selectTaskItem: todo => todo.taskItem,
        selecttasks: todo => todo.tasks,

    },
})



export const {
    setTodo,
    addNewTask,
    // updateTaskAsync,
    deletTasks,
    setTask,


    changeTitleTodoAsync,
    addNewTaskAsync,
    deletTaskAsync,
    getTaskAsync,
    deletToDoAsync,
    getTodoAsync,
    addNewToDoAsync,

} = todoSlice.actions


export const {
    selectTaskItem,
    selecttasks
    // selectStatus,
    // selectEditMode,
    // selectPosts

} = todoSlice.selectors

