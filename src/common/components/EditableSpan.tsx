import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

export type EditableSpanPropsType = {
	title: string
	onChange: (newTitleValue: string) => void
	style?: {}
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
	//локальный стейт для хранения значения, введенного в инпуте
	let [title, setTitle] = useState<string>('')
	//локальный стейт для хранения режима отображения (ViewMode/EditMode)
	let [editMode, setEditMode] = useState<boolean>(false)

	const activateViewMode = () => {
		setEditMode(false)
		props.onChange(title)
	}
	const activateEditMode = () => {
		setEditMode(true)
		setTitle(props.title)
	}
	const onChangeTitleHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}, [title])
	const onKeyDownHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			activateViewMode()
		}
	}, [editMode, title])
	return (
		editMode ?
			<TextField
				type="text"
				onChange={onChangeTitleHandler}
				onKeyDown={onKeyDownHandler}
				value={title}
				onBlur={activateViewMode}
				autoFocus={true}
				variant="standard"
			/>
			:
			<Tooltip title={'double click to edit'} placement="top-end">
			<span
				onDoubleClick={activateEditMode}
				style={props.style}>
				{props.title}
			</span>
			</Tooltip>
	)
})