import {combineReducers, legacy_createStore as createStore} from 'redux';
import {todoListsReducer} from './reducers/todoListsReducer';
import {tasksReducer} from './reducers/tasksReducer';

const rootReducer = combineReducers(
    {
        todolists: todoListsReducer,
        tasks: tasksReducer
    }
)


export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)



// @ts-ignore
window.store = store