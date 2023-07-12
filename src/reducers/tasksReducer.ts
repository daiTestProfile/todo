import {v1} from 'uuid';
import {AddTodoListACType, RemoveTodoListACType, todoListId1} from './todoListsReducer';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TasksForTodoListType = {
    [key: string]: TaskType[]
}

const initialState: TasksForTodoListType = {
    [todoListId1]: [
        {id: v1(), title: 'first task', isDone: false},
        {id: v1(), title: 'second task', isDone: false},
        {id: v1(), title: 'third task', isDone: false},
        {id: v1(), title: 'fourth task', isDone: false},
        {id: v1(), title: 'fifth task', isDone: false},
    ],
}

export const tasksReducer = (state: TasksForTodoListType = initialState, action: TasksReducerActionsType): TasksForTodoListType => {
    switch (action.type) {
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.payload.newTaskTitle, isDone: false}
            return {
                ...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
            }
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(task => task.id != action.payload.taskForRemoveId)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskForChangeId ? {
                    ...task,
                    isDone: action.payload.newIsDone
                } : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskForChangeId ? {
                    ...task,
                    title: action.payload.newTitle
                } : task)
            }
        }

        case 'ADD-NEW-TODOLIST': {
            return {...state, [action.payload.newTodoListId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.payload.todoListForRemoveId]
            return newState
        }
        default:
            return state
    }
}

//Тип экшенов для TasksReducer:
type TasksReducerActionsType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodoListACType
    | RemoveTodoListACType

type AddTaskACType = ReturnType<typeof addTaskAC>//автоматически типизируем объект, который вернет экшн криэйтор addTaskAC
export const addTaskAC = (todoListId: string, newTaskTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListId,
            newTaskTitle
        }
    } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC> //автоматически типизируем объект, который вернет экшн криэйтор removeTaskAC
export const removeTaskAC = (todoListId: string, taskForRemoveId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListId,
            taskForRemoveId
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListId: string, taskForChangeId: string, newIsDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListId,
            taskForChangeId,
            newIsDone
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoListId: string, taskForChangeId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoListId,
            taskForChangeId,
            newTitle
        }
    } as const
}
