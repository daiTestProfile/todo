import {combineReducers} from 'redux';
import {todoListsReducer} from 'features/TodoList/todoListsReducer';
import {tasksReducer} from 'features/TodoList/tasksReducer';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers(
    {
        todoLists: todoListsReducer,
        tasks: tasksReducer
    }
)

export const store = configureStore({
  reducer: rootReducer
})

//types:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;