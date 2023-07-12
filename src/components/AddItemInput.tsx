import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ControlPointOutlined from '@mui/icons-material/ControlPointOutlined';
import Tooltip from '@mui/material/Tooltip';

export type AddItemInputPropsType = {
	addItem: (title: string) => void
	placeholder?: string
	style?: any
	buttonHoverText?: string
}

export const AddItemInput = React.memo((props: AddItemInputPropsType) => {
	//локальный стейт для хранения значения, введенного в инпуте
	const [title, setTitle] = useState<string>('')
	//локальный стейт для ошибки ввода(пустая строка, превышение лимита введенных символов)
	const [error, setError] = useState<boolean>(false)

	const maxLengthMessage: number = 20
	const isUserMessageToLong: boolean = title.length > maxLengthMessage
	const isUserMessageToShot: boolean = title.trim().length < 1
	const isUserMessageValid: boolean = !isUserMessageToLong && !isUserMessageToShot
	const isBtnDisabled = !isUserMessageValid

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		error && setError(false) //снимаем ошибку, если начали печатать
		setTitle(e.currentTarget.value)
	}

	const onBlurHandler = () => {
		error && setError(false) //снимаем ошибку, если убрали фокус
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		e.key === 'Enter' && addItem()
	}

	const addItem = () => {
		const trimmedTitle = title.trim()
		if (isUserMessageValid) {
			props.addItem(trimmedTitle);
			setTitle('')
		} else setError(true)
	}

	return (
		<div>


			<TextField
				label={props.placeholder || ''}
				variant="outlined"
				value={title}
				onChange={onChangeHandler}
				onBlur={onBlurHandler}
				onKeyDown={onKeyDownHandler}
				error={error}
				style={props.style}
				helperText={(isUserMessageToLong && 'too long title') || (error && isUserMessageToShot && 'title is required')}
			/>
			<Tooltip title={props.buttonHoverText || ''} placement="right-start">
				<span>
						<IconButton
							disabled={isBtnDisabled}
							onClick={addItem}
							color={'primary'}
							style={{margin: '6px 0px 0px 3px'}}
						>
					<ControlPointOutlined/>
				</IconButton>
				</span>
			</Tooltip>
		</div>)
})