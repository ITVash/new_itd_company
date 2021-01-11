import classNames from "classnames"
import React from "react"
//import { axios } from "../../core"
interface IClickbaitProps {
	setCheck?: React.Dispatch<React.SetStateAction<boolean>>
	check?: boolean
}
type TObj = {
	list1: string[]
	list2: string[]
	list3: string[]
	list4: any[]
	forms: string[]
}
const Clickbait: React.FC<IClickbaitProps> = ({
	setCheck,
	check,
}): React.ReactElement => {
	const maping = new Map<string, any>([
		["list1", new Map<string, string[]>([])],
		["list2", new Map<string, string[]>([])],
		["list3", new Map<string, string[]>([])],
		["list4", new Map<string, string[]>([])],
		["forms", new Map<string, string[]>([])],
	])

	const clickBait = () => {
		const obj: TObj = {
			list1: [],
			list2: [],
			list3: [],
			list4: [],
			forms: [],
		}
		maping.get("list1")!.forEach((item: string) => {
			obj.list1.push(item)
		})
		maping.get("list2")!.forEach((item: string) => {
			obj.list2.push(item)
		})
		maping.get("list3")!.forEach((item: string) => {
			obj.list3.push(item)
		})
		obj.list4.push(maping.get("list4"))
		maping.get("forms")!.forEach((item: string) => {
			obj.forms.push(item)
		})
		//axios.post("/sendclick", obj)
		console.log("maping", maping)
		setCheck!(false)
	}

	const slider = React.useCallback(() => {
		let index = 0
		const slides: NodeListOf<HTMLElement> = document.querySelectorAll(
			".clickbait_slide",
		)
		let length = slides.length
		for (let i = 0; i < length; i++) {
			let offset = i * 100 + "%"
			slides.item(i).style.left = offset
		}
		if (check)
			document.querySelector("#number_of_slide")!.textContent =
				"0" + (index + 1) + "/" + length + ""
		const nextSlide = document.querySelector("#next_slide")
		const prevSlide = document.querySelector("#prev_slide")
		if (check)
			nextSlide!.addEventListener("click", () => {
				index++
				prevSlide!.classList.remove("disable")
				if (index >= length - 1) {
					nextSlide!.classList.add("disable")
					document.querySelector("#slider_title")!.textContent =
						"Отлично! Остался последний шаг. Оставьте нам ваши контакты и мы с вами связажемся"
				}
				if (index > length - 1) {
					index--
				}
				slides.forEach((item, id) => {
					let offset = (id - index) * 100 + "%"
					item.style.transition = "all .500s linear"
					setTimeout(() => (item.style.left = offset), 1)
				})
				document.querySelector("#number_of_slide")!.textContent =
					"0" + (index + 1) + "/" + length + ""
			})
		if (check)
			prevSlide!.addEventListener("click", () => {
				index--
				nextSlide!.classList.remove("disable")
				document.querySelector("#slider_title")!.textContent =
					"Ответьте на несколько вопросов и получите информацию о заказе"
				if (index <= 0) {
					prevSlide!.classList.add("disable")
				}
				if (index < 0) {
					index++
				}
				slides.forEach((item, id) => {
					let offset = (id - index) * 100 + "%"
					item.style.transition = "all .500s linear"
					setTimeout(() => (item.style.left = offset), 1)
				})
				document.querySelector("#number_of_slide")!.textContent =
					"0" + (index + 1) + "/" + length + ""
			})
	}, [check])

	React.useEffect(() => {
		slider()
	}, [slider])

	return (
		<>
			<section className='clickbait_container'>
				<img
					src='/img/close_form.png'
					alt=''
					id='clickbait_close'
					onClick={() => setCheck!(false)}
				/>
				<button id='next_slide'></button>
				<button id='prev_slide' className='disable'></button>
				<div id='number_of_slide'></div>

				<div className='slider_wrapper'>
					<h3 id='slider_title'>
						Ответьте на несколько вопросов и получите информацию о заказе
					</h3>

					<div id='slider_body'>
						<div className='clickbait_slide'>
							<div className='question_container'>
								<h4>1. Какого типа должен быть Ваш сайт?</h4>
								<div className='answers'>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='c1'
											name='cc'
											className='general'
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												e.target.checked
													? maping.get("list1")!.set("Промо-сайт", "Промо-сайт")
													: maping.get("list1")!.delete("Промо-сайт")
											}}
										/>
										<label htmlFor='c1' className='checkbox_label'>
											<span></span>Промо-сайт
										</label>
									</div>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='c2'
											name='cc'
											className='general'
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												e.target.checked
													? maping
															.get("list1")
															.set("Сайт-визитка", "Сайт-визитка")
													: maping.get("list1").delete("Сайт-визитка")
											}}
										/>
										<label htmlFor='c2' className='checkbox_label'>
											<span></span>Сайт-визитка
										</label>
									</div>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='c3'
											name='cc'
											className='general'
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												e.target.checked
													? maping
															.get("list1")
															.set("Корпоративный сайт", "Корпоративный сайт")
													: maping.get("list1").delete("Корпоративный сайт")
											}}
										/>
										<label htmlFor='c3' className='checkbox_label'>
											<span></span>Корпоративный сайт
										</label>
									</div>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='c4'
											name='cc'
											className='general'
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												e.target.checked
													? maping
															.get("list1")
															.set("Интернет магазин", "Интернет магазин")
													: maping.get("list1").delete("Интернет магазин")
											}}
										/>
										<label htmlFor='c4' className='checkbox_label'>
											<span></span>Интернет магазин
										</label>
									</div>
									<div className='my_answer'>
										<p>Свой вариант</p>
										<textarea
											name='my_answer'
											cols={30}
											rows={10}
											value={maping.get("list1").get("Text")}
											onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
												maping.get("list1").set("Text", e.target.value)
											}}></textarea>
									</div>
								</div>
							</div>
						</div>

						<div className='clickbait_slide'>
							<div className='question_container'>
								<h4>2. Дополнительные языковые версии?</h4>
								<div className='answers'>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='cl1'
											name='cc1'
											className='general'
											onChange={(e) => {
												e.target.checked
													? maping.get("list2").set("Английский", "Английский")
													: maping.get("list2").delete("Английский")
											}}
										/>
										<label htmlFor='cl1' className='checkbox_label'>
											<span></span>Английский
										</label>
									</div>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='cl2'
											name='cc'
											className='general'
											onChange={(e) => {
												e.target.checked
													? maping.get("list2").set("Немецкий", "Немецкий")
													: maping.get("list2").delete("Немецкий")
											}}
										/>
										<label htmlFor='cl2' className='checkbox_label'>
											<span></span>Немецкий
										</label>
									</div>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='cl3'
											name='cc'
											className='general'
											onChange={(e) => {
												e.target.checked
													? maping
															.get("list2")
															.set("Французский", "Французский")
													: maping.get("list2").delete("Французский")
											}}
										/>
										<label htmlFor='cl3' className='checkbox_label'>
											<span></span>Французский
										</label>
									</div>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='cl4'
											name='cc'
											className='general'
											onChange={(e) => {
												e.target.checked
													? maping.get("list2").set("Китайский", "Китайский")
													: maping.get("list2").delete("Китайский")
											}}
										/>
										<label htmlFor='cl4' className='checkbox_label'>
											<span></span>Китайский
										</label>
									</div>
									<div className='my_answer'>
										<p>Свой вариант</p>
										<textarea
											name='my_answer'
											cols={30}
											rows={10}
											value={maping.get("list2").get("Text")}
											onChange={(e) => {
												maping.get("list2").set("Text", e.target.value)
											}}></textarea>
									</div>
								</div>
							</div>
						</div>

						<div className='clickbait_slide'>
							<div className='question_container'>
								<h4>3. Желаемые сроки сдачи проекта:</h4>
								<div className='answers'>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='c31'
											name='cc'
											className='general'
											onChange={(e) => {
												e.target.checked
													? maping
															.get("list3")
															.set("до 1 месяца", "до 1 месяца")
													: maping.get("list3").delete("до 1 месяца")
											}}
										/>
										<label htmlFor='c31' className='checkbox_label'>
											<span></span>- до 1 месяца
										</label>
									</div>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='c32'
											name='cc'
											className='general'
											onChange={(e) => {
												e.target.checked
													? maping
															.get("list3")
															.set("до 3х месяцев", "до 3х месяцев")
													: maping.get("list3").delete("до 3х месяцев")
											}}
										/>
										<label htmlFor='c32' className='checkbox_label'>
											<span></span>- до 3х месяцев
										</label>
									</div>
									<div className='checkbox'>
										<input
											type='checkbox'
											id='c33'
											name='cc'
											className='general'
											onChange={(e) => {
												e.target.checked
													? maping
															.get("list3")
															.set("до 6 месяцев", "до 6 месяцев")
													: maping.get("list3").delete("до 6 месяцев")
											}}
										/>
										<label htmlFor='c33' className='checkbox_label'>
											<span></span>- до 6 месяцев
										</label>
									</div>
									{/* <div className='checkbox'>
                  <input
                    type='checkbox'
                    id='c34'
                    name='cc'
                    className='general'
                  />
                  <label htmlFor='c34' className='checkbox_label'>
                    <span></span>Lorem smod tempor incididunt
                  </label>
                </div> */}
									<div className='my_answer'>
										<p>Свой вариант</p>
										<textarea
											name='my_answer'
											cols={30}
											rows={10}
											value={maping.get("list3").get("Text")}
											onChange={(e) => {
												maping.get("list3").set("Text", e.target.value)
											}}></textarea>
									</div>
								</div>
							</div>
						</div>

						<div className='clickbait_slide'>
							<div className='question_container'>
								<h4>4. Наличие логотипа и фирменного стиля:</h4>
								<div className='answers'>
									<div className='radiobutton'>
										<input
											type='radio'
											id='c41'
											name='cc'
											className='general'
											onChange={() =>
												maping
													.get("list4")
													.set("Есть логотип, нет фирменного стиля")
											}
										/>
										<label htmlFor='c41' className='checkbox_label'>
											<span></span>- Есть логотип, нет фирменного стиля
										</label>
									</div>
									<div className='radiobutton'>
										<input
											type='radio'
											id='c42'
											name='cc'
											className='general'
											onChange={() =>
												maping
													.get("list4")
													.set("Нет логотипа, есть фирменный стиль")
											}
										/>
										<label htmlFor='c42' className='checkbox_label'>
											<span></span>- Нет логотипа, есть фирменный стиль
										</label>
									</div>
									<div className='radiobutton'>
										<input
											type='radio'
											id='c43'
											name='cc'
											className='general'
											onChange={() =>
												maping.set(
													"list4",
													"Нет логотипа и нет фирменного стиля",
												)
											}
										/>
										<label htmlFor='c43' className='checkbox_label'>
											<span></span>- Нет логотипа и нет фирменного стиля
										</label>
									</div>
									<div className='radiobutton'>
										<input
											type='radio'
											id='c44'
											name='cc'
											className='general'
											onChange={() =>
												maping.set("list4", "Есть логотип и фирменный стиль")
											}
										/>
										<label htmlFor='c44' className='checkbox_label'>
											<span></span>- Есть логотип и фирменный стиль
										</label>
									</div>
								</div>
							</div>
						</div>

						<div className='clickbait_slide'>
							<form>
								<div className='index_input_container'>
									<input
										type='text'
										className={classNames("index_contacts_input", {
											//error_input: errors.names,
										})}
										placeholder='Имя'
										name='name'
										//onBlur={handleBlur}
										required
										value={maping.get("forms").get("name")}
										onChange={(e) => {
											//handleChange(e)
											maping.get("forms").set("name", e.target.value)
										}}
										/* value={values.name} */
										/* onChange={handleChange} */
									/>
									<input
										type='tel'
										className={classNames("index_contacts_input", {
											//error_input: errors.phone
										})}
										placeholder='Телефон (WhatsApp/Viber)'
										name='phone'
										//onBlur={handleBlur}
										required
										value={maping.get("forms").get("phone")}
										onChange={(e) => {
											maping.get("forms").set("phone", e.target.value)
										}}
										/* value={values.phone} */
										/* onChange={(e) => handleChange(e)} */
									/>
									<input
										type='email'
										className={classNames("index_contacts_input", {
											//error_input: errors.email
										})}
										placeholder='Email'
										name='email'
										//onBlur={handleBlur}
										required
										value={maping.get("forms").get("email")}
										onChange={(e) => {
											maping.get("forms").set("email", e.target.value)
										}}
										/* value={values.email} */
										/* onChange={(e) => handleChange(e)} */
									/>
								</div>
								<textarea
									className={classNames("textarea", {
										//error_input: errors.text
									})}
									name='text'
									id=''
									cols={30}
									rows={10}
									placeholder='Ваше сообщение'
									//onBlur={handleBlur}
									required
									value={maping.get("forms").get("text")}
									onChange={(e) => {
										maping.get("forms").set("text", e.target.value)
									}}
									/* value={values.text} */
									/* onChange={(e) => handleChange(e)} */
								></textarea>
								<div className='error_form_msg'>
									{/* {errors.name && `${errors.name}\r\n`}
              {errors.phone && `${errors.phone} \r\n`}
              {errors.email && `${errors.email} \r\n`}
              {errors.text && errors.text} */}
								</div>
								<button
									type='button'
									/* disabled={isSubmitting} */ onClick={() => {
										clickBait()
										//axios.post("http://localhost:8080/api/sendclick", maping)
									}}>
									Отправить
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Clickbait
