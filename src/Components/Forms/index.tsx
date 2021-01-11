import classNames from "classnames"
import React from "react"

const Forms = () => {
	return (
		<>
			<form onSubmit={() => {}}>
				<div className={classNames("index_input_container")}>
					<input
						type='text'
						name='name'
						className={classNames("index_contacts_input", {
							error_input: false,
						})}
						placeholder='Имя'
						required
					/>
					<input
						type='tel'
						name='phone'
						className={classNames("index_contacts_input", {
							error_input: false,
						})}
						placeholder='Телефон (WhatsApp/Viber)'
						required
					/>
					<input
						type='email'
						name='email'
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
					placeholder='Ваше сообщение'
					className={classNames({ error_input: false })}
					required></textarea>
				<div className='error_form_msg'></div>
				<button type='submit' disabled={false}>
					Отправить
				</button>
			</form>
		</>
	)
}

export default Forms
