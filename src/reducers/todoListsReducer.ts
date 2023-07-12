import {v1} from 'uuid';

export type TodoListType = {
    id: string;
    title: string;
}

export const todoListId1 = v1();

 const initialState: TodoListType[] = [
    {id: todoListId1, title: 'First todolist title'}
]

export const todoListsReducer = (state: TodoListType[] = initialState, action: TodoListsReducerActionsType): TodoListType[] => {
    switch (action.type) {
        case 'ADD-NEW-TODOLIST': {
            let newTodoList: TodoListType = {id: action.payload.newTodoListId, title: action.payload.newTodoListTitle}
            return [newTodoList, ...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(todoList => todoList.id !== action.payload.todoListForRemoveId)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todoList => todoList.id === action.payload.todoListForChangeId? {...todoList, title: action.payload.newTitle} :todoList)
        }
        default:
            return state
    }
}

//Тип экшенов для TodoListReducer:
type TodoListsReducerActionsType =
    AddTodoListACType
    | RemoveTodoListACType
    | ChangeTodoListTitleACType

//экспортируем тип "AddTodoListACType" т.к. этот экшн криэйтор также будем использовать в taskReducer при добавлении пустого массива тасок для нового тудулиста
export type AddTodoListACType = ReturnType<typeof addTodoListAC>//автоматически типизируем объект, который вернет экшн криэйтор addTodoListAC
export const addTodoListAC = (newTodoListTitle: string) => {
    return {
        type: 'ADD-NEW-TODOLIST',
        payload: {
            newTodoListId: v1(),
            newTodoListTitle
        }
    } as const
}

//экспортируем тип "RemoveTodoListACType" т.к. этот экшн криэйтор также будем использовать в taskReducer при удалении  массива тасок удаленного тудулиста
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>//автоматически типизируем объект, который вернет экшн криэйтор addTodoListAC
export const removeTodoListAC = (todoListForRemoveId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListForRemoveId
        }
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todoListForChangeId: string, newTitle: string) =>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListForChangeId,
            newTitle
        }
    }as const
}
