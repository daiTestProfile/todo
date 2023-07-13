import React, {FC, memo} from 'react';
import {TaskType} from 'features/TodoList/tasksReducer';
import {Task, TaskComponentType} from 'features/TodoList/TasksList/Task/Task';

export const TasksList: FC<TasksListPropsType> =memo((props): JSX.Element => {
	const tasksItems: JSX.Element | TaskComponentType[] =
		props.tasks.length
			? props.tasks.map((task) => {
				return (
					<Task
						todoListId={props.todoListId}
						removeTask={props.removeTask}
						changeTaskStatus={props.changeTaskStatus}
						changeTaskTitle={props.changeTaskTitle}
						task={task}
						key={task.id}
					/>
				)
			})
			: <span>Your tasks list is empty</span>
	return (
		<ul>
			{tasksItems}
		</ul>
	);
}) ;

//types:
type TasksListPropsType = {
	todoListId: string
	tasks: TaskType[]
	removeTask: (todoListId: string, taskId: string) => void
	changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
	changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
}

