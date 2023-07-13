import {v1} from 'uuid';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const todoListId1 = v1();

const initialState: TodoListType[] = [
	{id: todoListId1, title: 'First todolist title'}
]

const slice = createSlice({
	name: 'todoLists',
	initialState,
	reducers: {
		addTodoListAC: (state, action: PayloadAction<{ newTodoList: TodoListType }>) => {
			state.unshift(action.payload.newTodoList)
		},

		removeTodoListAC: (state, action: PayloadAction<{ todoListForRemoveId: string }>) => {
			const index = state.findIndex(t => t.id === action.payload.todoListForRemoveId)
			if (index !== -1) {state.splice(index, 1)}
		},

		changeTodoListTitleAC: (state, action: PayloadAction<{ todoListForChangeId: string, newTitle: string }>) => {
			const index = state.findIndex(t => t.id === action.payload.todoListForChangeId)
			if (index > -1) {state[index].title = action.payload.newTitle}
		},
	}
})

export const todoListsReducer = slice.reducer
export const {
	addTodoListAC,
	removeTodoListAC,
	changeTodoListTitleAC,
} = slice.actions

//types:
export type TodoListType = {
	id: string;
	title: string;
}