import {TaskType} from '../../tasksReducer';
import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from 'common/components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export const Task: FC<TaskComponentPropsType> = memo((props) => {
	const removeTaskHandler = useCallback(() =>
			props.removeTask(props.todoListId, props.task.id),
		[props.removeTask, props.todoListId, props.task.id]
	)
	const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
			props.changeTaskStatus(props.todoListId, props.task.id, e.currentTarget.checked),
		[props.changeTaskStatus, props.todoListId, props.task.id]
	)
	const changeTaskTitleHandler = useCallback((newTitle: string) =>
			props.changeTaskTitle(props.todoListId, props.task.id, newTitle),
		[props.changeTaskTitle, props.todoListId, props.task.id]
	)
	return (
		<div style={{position: 'relative', marginBottom: '5px', paddingRight: '34px'}}>
			<Checkbox
				checked={props.task.isDone}
				onChange={changeTaskStatusHandler}
				style={{position: 'absolute', top: '-8px', left: '-45px'}}
			/>
			<EditableSpan
				title={props.task.title}
				onChange={changeTaskTitleHandler}
				style={props.task.isDone ? {opacity: '0.5', textDecoration: 'line-through'} : {}}
			/>
			<Tooltip title={'delete task'} placement="right-start">
				<IconButton
					aria-label="delete"
					onClick={removeTaskHandler}
					style={{position: 'absolute', top: '-8px', right: '3px'}}
				>
					<Delete/>
				</IconButton>
			</Tooltip>
		</div>
	)
})

//types:
export type TaskComponentPropsType = {
	todoListId: string
	removeTask: (todoListId: string, taskId: string) => void
	changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
	changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
	task: TaskType
}
export type TaskComponentType = ReturnType<typeof Task>