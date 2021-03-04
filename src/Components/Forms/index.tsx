import axios from "axios"
import classNames from "classnames"
import React from "react"
import { useHistory } from "react-router-dom"
type TForms = {
	name?: string
	phone?: string
	email?: string
	text?: string
}
const Forms: React.FC = (): React.ReactElement => {
	const [forms, setForms] = React.useState<TForms>()
	const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setForms((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}
	const history = useHistory()
	const saveForm = (): void => {
		axios.post("/sendform", forms)
		history.push("/")
		setForms(undefined)
	}
	return (
		<>
			<form>
				<div className={classNames("index_input_container")}>
					<input
						type='text'
						name='name'
						value={forms?.name}
						onChange={changeInput}
						className={classNames("index_contacts_input", {
							error_input: false,
						})}
						placeholder='Имя'
						required
					/>
					<input
						type='tel'
						name='phone'
						value={forms?.phone}
						onChange={changeInput}
						className={classNames("index_contacts_input", {
							error_input: false,
						})}
						placeholder='Телефон (Viber)'
						required
					/>
					<input
						type='email'
						name='email'
						value={forms?.email}
						onChange={changeInput}
						className={classNames("index_contacts_input", {
							error_input: false,
						})}
						placeholder='Email'
						required
					/>
				</div>
				<textarea
					name='text'
					id=''
					cols={30}
					rows={10}
					value={forms?.text}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
						setForms((prev) => ({ ...prev, [e.target.name]: e.target.value }))
					}
					placeholder='Ваше сообщение'
					className={classNames({ error_input: false })}
					required></textarea>
				<div className='error_form_msg'></div>
				<button onClick={saveForm} disabled={false}>
					Отправить
				</button>
			</form>
		</>
	)
}

export default Forms
