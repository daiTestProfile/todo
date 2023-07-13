import React, {FC, memo, useCallback} from 'react';
import {TasksList} from './TasksList/TasksList';
import {AddItemInput} from 'common/components/AddItemInput';
import {EditableSpan} from 'common/components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import {TaskType} from 'features/TodoList/tasksReducer';

export const TodoList: FC<TodoListPropsType> = memo((props) => {
    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }
        const addTask = useCallback((title: string) => props.addTask(props.todoListId, title), [props.addTask, props.todoListId])

    const changeTodoListTitleHandler = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTitle)
    },[props.changeTodoListTitle, props.todoListId])

    return (
        <div className={'todolist'} style={{position: 'relative'}}>
        <Tooltip title={'delete todolist'} placement="right-start">
            <IconButton aria-label="delete"
                        onClick={removeTodoListHandler}
                        style={{position: 'absolute', right: '-10px', top: '-30px'}}>
                <Delete/>
            </IconButton>
        </Tooltip>
            <h3>
                <EditableSpan
                    title={props.title}
                    onChange={changeTodoListTitleHandler}
                />
            </h3>
            <AddItemInput
                addItem={addTask}
                placeholder={'Enter new task title'}
                buttonHoverText={'add task'}
            />
            <TasksList
                todoListId={props.todoListId}
                //tasks={props.tasks}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />
        </div>
    );
});

//types:
type TodoListPropsType = {
  todoListId: string
  title: string;
  tasks: TaskType[];
  removeTask: (todoListId: string, taskId: string) => void
  addTask: (todoListId: string, title: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
  removeTodoList: (todoListId: string) => void
  changeTodoListTitle: (todoListId: string, newTitle: string) => void
}




