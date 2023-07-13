import {v1} from 'uuid';
import {addTodoListAC, removeTodoListAC, todoListId1} from 'features/TodoList/todoListsReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TasksForTodoListType = {
	[todoListId1]: [
		{id: v1(), title: 'first task', isDone: false},
		{id: v1(), title: 'second task', isDone: false},
		{id: v1(), title: 'third task', isDone: false},
		{id: v1(), title: 'fourth task', isDone: false},
		{id: v1(), title: 'fifth task', isDone: false},
	],
}

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTaskAC: (state, action: PayloadAction<{ todoListId: string, newTaskTitle: string }>) => {
			const newTask: TaskType = {id: v1(), title: action.payload.newTaskTitle, isDone: false}
			state[action.payload.todoListId].unshift(newTask)
		},

		changeTaskStatusAC: (state, action: PayloadAction<{ todoListId: string, taskForChangeId: string, newIsDone: boolean }>) => {
			const tasks = state[action.payload.todoListId]
			const index = tasks.findIndex(t => t.id === action.payload.taskForChangeId)
			if (index > -1) {
				tasks[index].isDone = action.payload.newIsDone
			}
		},

		changeTaskTitleAC: (state, action: PayloadAction<{ todoListId: string, taskForChangeId: string, newTitle: string }>) => {
			const tasks = state[action.payload.todoListId]
			const index = tasks.findIndex(t => t.id === action.payload.taskForChangeId)
			if (index > -1) {
				tasks[index].title = action.payload.newTitle
			}
		},

		removeTaskAC: (state, action: PayloadAction<{ todoListId: string, taskForRemoveId: string }>) => {
			const tasks = state[action.payload.todoListId]
			const index = tasks.findIndex(t => t.id === action.payload.taskForRemoveId)
			if (index > -1) {
				tasks.splice(index, 1)
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addTodoListAC, (state, action)=> {
				state[action.payload.newTodoList.id] = []
			})
			.addCase(removeTodoListAC, (state, action) => {
				delete state[action.payload.todoListForRemoveId]
			})
	}
})

export const tasksReducer = slice.reducer

export const {
	addTaskAC,
	removeTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
} = slice.actions

//types:
export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
}

export type TasksForTodoListType = {
	[key: string]: TaskType[]
}