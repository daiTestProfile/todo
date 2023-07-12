import React, {useCallback, } from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import {AddItemInput} from './components/AddItemInput';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	TasksForTodoListType
} from './reducers/tasksReducer';
import {
	addTodoListAC,
	changeTodoListTitleAC,
	removeTodoListAC,
	TodoListType
} from './reducers/todoListsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';

export const theme = createTheme({
	palette: {
		primary: {
			light: '#7c7979',
			main: '#605e5e',
			dark: '#413d3d',
			contrastText: '#fff',
		},
		secondary: {
			light: '#90a4ae',
			main: '#607d8b',
			dark: '#455a64',
			contrastText: '#000',
		},
	},
});

const App: React.FC = () => {
	const dispatch = useDispatch()
	const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
	const tasks = useSelector<AppRootStateType, TasksForTodoListType>(state => state.tasks)
	const addTodoList = useCallback((newTodoListTitle: string) => {
		const action = addTodoListAC(newTodoListTitle)
		dispatch(action)
	}, [dispatch])
	const changeTodoListTitle = useCallback((todoListForChangeId: string, newTitle: string) => {
		dispatch(changeTodoListTitleAC(todoListForChangeId, newTitle))
	}, [dispatch])
	const removeTodoList = useCallback((todoListForRemoveId: string) => {
		const action = removeTodoListAC(todoListForRemoveId)
		dispatch(action)

	}, [dispatch])
	const addTask = useCallback((todoListId: string, newTaskTitle: string) => {
		dispatch(addTaskAC(todoListId, newTaskTitle))
	}, [dispatch])//+
	const removeTask = useCallback((todoListId: string, taskForRemoveId: string) => {
		dispatch(removeTaskAC(todoListId, taskForRemoveId))
	}, [dispatch]) //+
	const changeTaskStatus = useCallback((todoListId: string, taskForChangeID: string, newIsDone: boolean) => {
		dispatch(changeTaskStatusAC(todoListId, taskForChangeID, newIsDone))
	}, [dispatch]) //+
	const changeTaskTitle = useCallback((todoListId: string, taskForChangeId: string, newTitle: string) => {
		dispatch(changeTaskTitleAC(todoListId, taskForChangeId, newTitle))
	}, [dispatch]) //+

	return (
		<div className="App" style={{backgroundColor: '#90a4ae'}}>
			<ThemeProvider theme={theme}>
				<AppBar position="fixed">
					<Toolbar>
						<Typography variant="h6" component="div" style={{flexGrow: 1, textAlign: 'center'}}>
							create todolists so you don't forget anything
						</Typography>
					</Toolbar>
				</AppBar>

				<Container fixed style={{backgroundColor: '#cfd8dc', paddingBottom: '20px', minHeight: '880px'}}>
					<Grid container style={{padding: '74px 0px 10px 0px'}}>
						<AddItemInput addItem={addTodoList}
													placeholder={'Enter new todolist title'}
													buttonHoverText={'add todolist'}
						/>
					</Grid>
					<Grid container spacing={5}>
						{todoLists.map(el => {
								let tasksForTodoList = tasks[el.id];
								return <Grid item key={el.id}>
									<Paper elevation={3}
												 style={{
													 padding: '15px',
													 backgroundColor: '#fff59d',
													 minWidth: '250px',
													 maxWidth: '300px',
													 overflowWrap: 'break-word'
												 }}>
										<TodoList
											todoListId={el.id}
											title={el.title}
											tasks={tasksForTodoList}
											removeTask={removeTask}
											addTask={addTask}
											changeTaskStatus={changeTaskStatus}
											changeTaskTitle={changeTaskTitle}
											removeTodoList={removeTodoList}
											changeTodoListTitle={changeTodoListTitle}
										/>
									</Paper>
								</Grid>
							}
						)
						}</Grid>
				</Container>
			</ThemeProvider>
		</div>
	);
}

export default App;
