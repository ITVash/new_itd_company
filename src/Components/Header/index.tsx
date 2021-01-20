import classNames from "classnames"
import React from "react"
import { Link } from "react-router-dom"

import "./style.scss"

const Header: React.FC = (): React.ReactElement => {
	const [open, setOpen] = React.useState<boolean>(false)
	const [lang, setLang] = React.useState<boolean>(false)
	const [call, setCall] = React.useState<boolean>(false)
	const [mail, setMail] = React.useState<boolean>(false)

	const callRef = React.useRef<HTMLUListElement>(null)
	const langRef = React.useRef<HTMLUListElement>(null)
	const mailRef = React.useRef<HTMLUListElement>(null)
	const popupHandler = React.useCallback((e) => {
		if (!e.path.includes(callRef.current)) {
			setCall(false)
		}
		if (!e.path.includes(langRef.current)) {
			setLang(false)
		}
		if (!e.path.includes(mailRef.current)) {
			setMail(false)
		}
	}, [])
	React.useEffect(() => {
		document.body.addEventListener("click", popupHandler)
	}, [popupHandler])

	React.useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			<section id='main_menu' className={classNames({ open: open })}>
				<img
					src='/img/close_form.png'
					alt='Close'
					id='close_menu'
					onClick={() => setOpen(false)}
				/>
				<ul id='main_menu_container'>
					<li>
						<Link
							to='/'
							className='main_menu_item'
							onClick={(): void => setOpen(false)}>
							<div className='bottom'>
								<div className='menu_title'>Главная</div>
							</div>
							<div className='top'></div>
						</Link>
					</li>
					<li>
						<Link
							to='/about'
							className='main_menu_item'
							onClick={(): void => setOpen(false)}>
							<div className='bottom'>
								<div className='menu_title'>О нас</div>
							</div>
							<div className='top'></div>
						</Link>
					</li>
					<li>
						<Link
							to='/portfolio'
							className='main_menu_item'
							onClick={(): void => setOpen(false)}>
							<div className='bottom'>
								<div className='menu_title'>Портфолио</div>
							</div>
							<div className='top'></div>
						</Link>
					</li>
					<li>
						<Link
							to='/services'
							className='main_menu_item'
							onClick={(): void => setOpen(false)}>
							<div className='bottom'>
								<div className='menu_title'>Услуги</div>
							</div>
							<div className='top'></div>
						</Link>
					</li>
					<li>
						<Link
							to='/type-site'
							className='main_menu_item'
							onClick={(): void => setOpen(false)}>
							<div className='bottom'>
								<div className='menu_title'>Типы сайтов</div>
							</div>
							<div className='top'></div>
						</Link>
					</li>
					<li>
						<Link
							to='/contacts'
							className='main_menu_item'
							onClick={(): void => setOpen(false)}>
							<div className='bottom'>
								<div className='menu_title'>Контакты</div>
							</div>
							<div className='top'></div>
						</Link>
					</li>
				</ul>
			</section>
			<section className='fixed_buttons_right'>
				<div className='lang_button_container'>
					<button
						className='lang_button'
						onClick={(e: React.MouseEvent) => {
							e.stopPropagation()
							setLang(!lang)
						}}></button>
					<ul
						className={classNames("popup_nav_list", {
							popup_nav_list__active: lang,
						})}
						ref={langRef}>
						<li className='popup_nav_list__item' data-google-lang='en'>
							Английский
						</li>
						<li className='popup_nav_list__item' data-google-lang='ru'>
							Русский
						</li>
					</ul>
				</div>
				<div className='call_button_container'>
					<button
						className='call_button'
						onClick={(e: React.MouseEvent) => {
							e.stopPropagation()
							setCall(!call)
						}}></button>
					<ul
						className={classNames("popup_nav_list popup_nav_list__bottom", {
							popup_nav_list__active: call,
						})}
						ref={callRef}>
						<li className='popup_nav_list__item'>
							<a className='popup_nav_list__item' href='tel:+79950060572'>
								+79950060572
							</a>
						</li>
					</ul>
				</div>
				<div className='mail_button_container'>
					<button
						className='mail_button'
						onClick={(e: React.MouseEvent) => {
							e.stopPropagation()
							setMail(!mail)
						}}></button>
					<ul
						className={classNames("popup_nav_list popup_nav_list__bottom", {
							popup_nav_list__active: mail,
						})}
						ref={mailRef}>
						<li className='popup_nav_list__item'>
							<a
								className='popup_nav_list__item'
								href='mailto:itdwebcompany@gmail.com'>
								itdwebcompany@gmail.com
							</a>
						</li>
						{/* <li class="popup_nav_list__item">mail@mail.mail</li> */}
					</ul>
				</div>
			</section>
			<section className='fixed_buttons_left'>
				<div id='menu_button' onClick={() => setOpen(true)}>
					<span className='side_menu_line'></span>
					<span className='side_menu_line'></span>
					<span className='side_menu_line'></span>
				</div>
			</section>
		</>
	)
}

export default Header
