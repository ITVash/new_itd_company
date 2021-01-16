import React from "react"
import { Button, Col, Form, Input, List, Row } from "antd"
//import { PlusOutlined } from "@ant-design/icons"
import Rquil from "react-quill"
import { observer } from "mobx-react-lite"
import AboutStores from "../../../stores/aboutStores"
import { IAbout, TAdvant } from "../../../Types"
import Upload from "../../Upload"
import { attachApi } from "../../../api"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

const About: React.FC = observer(
	(): React.ReactElement => {
		const about: IAbout = AboutStores.about
		const [ab, setAb] = React.useState<IAbout>()
		const [image1, setImage1] = React.useState<any>()
		const [image2, setImage2] = React.useState<Blob | string>()
		const [image3, setImage3] = React.useState<Blob | string>()
		const [image4, setImage4] = React.useState<Blob | string>()
		const [image5, setImage5] = React.useState<Blob>()
		const [advant, setAdvant] = React.useState<string>("")
		const [advantId, setAdvantId] = React.useState<number>()
		const [edit, setEdit] = React.useState<boolean>(false)

		const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
			const field = e.target.name
			const val = e.target.value
			setAb((prev) => ({ ...prev, [field]: val }))
		}
		const editAdvant = async (): Promise<void> => {
			try {
				if (advant === "") return alert("Преимущество не может быть пустым")
				const dataImg = new FormData()
				if (image5) {
					dataImg.append("file", image5!)
					const { data } = await attachApi.create(dataImg)
					const obj: TAdvant = {
						icon: `${data.data.destination}/${data.data.filename}`,
						title: advant,
					}
					AboutStores.editAdvant(advantId!, obj)
				} else {
					const obj: TAdvant = {
						title: advant,
					}
					AboutStores.editAdvant(advantId!, obj)
				}
				setAdvant("")
				setAdvantId(undefined)
				setImage5(undefined)
				setEdit(false)
				alert("Этап изменен!")
			} catch (error) {
				console.log("Ошибка", error)
			}
		}
		const changeAdvant = (e: React.ChangeEvent<HTMLInputElement>): void => {
			setAdvant(e.target.value)
		}
		const deleteAdvant = (id: number): void => {
			if (window.confirm("Удалить преимущество?")) {
				AboutStores.delAdvant(id)
			}
		}
		const saveAdvant = async (): Promise<void> => {
			try {
				if (advant === "") return alert("Преимущество не может быть пустым")
				const dataImg = new FormData()
				if (image5) {
					dataImg.append("file", image5!)
					const { data } = await attachApi.create(dataImg)
					const obj: TAdvant = {
						icon: `${data.data.destination}/${data.data.filename}`,
						title: advant,
					}
					AboutStores.addAdvant(obj)
				} else {
					const obj: TAdvant = {
						title: advant,
					}
					AboutStores.addAdvant(obj)
				}
				setAdvant("")
				setImage5(undefined)
				alert("Добавлен новый этап!")
			} catch (error) {}
		}
		const saveForm = async (): Promise<void> => {
			try {
				let pic1, pic2, pic3, pic4
				if (image1 instanceof Blob) {
					const file = new FormData()
					file.append("file", image1)
					const { data } = await attachApi.create(file)
					pic1 = `${data.data.destination}/${data.data.filename}`
				}
				if (image2 instanceof Blob) {
					const file = new FormData()
					file.append("file", image2)
					const { data } = await attachApi.create(file)
					pic2 = `${data.data.destination}/${data.data.filename}`
				}
				if (image3 instanceof Blob) {
					const file = new FormData()
					file.append("file", image3)
					const { data } = await attachApi.create(file)
					pic3 = `${data.data.destination}/${data.data.filename}`
				}
				if (image4 instanceof Blob) {
					const file = new FormData()
					file.append("file", image4)
					const { data } = await attachApi.create(file)
					pic4 = `${data.data.destination}/${data.data.filename}`
				}
				const obj: IAbout = {
					_id: ab?._id,
					desc: ab?.desc,
					email: ab?.email,
					phone: ab?.phone,
					title: ab?.title,
					why: ab?.why,
					photo1: pic1 ? pic1 : ab?.photo1,
					photo2: pic2 ? pic2 : ab?.photo2,
					photo3: pic3 ? pic3 : ab?.photo3,
					video: pic4 ? pic4 : ab?.video,
					work: ab?.work,
				}
				AboutStores.update(obj)
			} catch (error) {
				console.error(`Ошибка: ${error}`)
			}
		}
		React.useEffect(() => {
			if (!AboutStores.isLoad) {
				AboutStores.fetchAbout()
			}
		}, [])
		React.useEffect(() => {
			if (about) {
				setAb(about)
			}
		}, [about])
		React.useEffect(() => {
			if (AboutStores.about.photo1) {
				setImage1(AboutStores.about.photo1)
			}
			if (AboutStores.about.photo2) {
				setImage2(AboutStores.about.photo2)
			}
			if (AboutStores.about.photo3) {
				setImage3(AboutStores.about.photo3)
			}
			if (AboutStores.about.video) {
				setImage4(AboutStores.about.video)
			}
		}, [])
		return (
			<Row justify='center'>
				<Col span='23'>
					<h4>О Нас</h4>
				</Col>
				<Col span='23'>
					<Form layout='vertical' onFinish={saveForm}>
						<Form.Item label='Заголовок'>
							<Input
								placeholder='Заголовок'
								name='title'
								onChange={changeInput}
								value={ab && ab!.title}
							/>
						</Form.Item>
						<Form.Item label='Описание'>
							<Rquil
								onChange={(e) => setAb((prev) => ({ ...prev, desc: e }))}
								value={ab && ab!.desc}
							/>
						</Form.Item>
						<Form.Item label='Слоган'>
							<Rquil
								onChange={(e) => setAb((prev) => ({ ...prev, why: e }))}
								value={ab && ab!.why}
							/>
						</Form.Item>
						<Form.Item label='Фотография 1'>
							<Upload list={image1} onChange={setImage1} />
						</Form.Item>
						<Form.Item label='Фотография 2'>
							<Upload list={image2} onChange={setImage2} />
						</Form.Item>
						<Form.Item label='Фотография 3'>
							<Upload list={image3} onChange={setImage3} />
						</Form.Item>
						<Form.Item label='Видео'>
							<Upload list={image4} onChange={setImage4} />
						</Form.Item>
						<Form.Item label='Телефон'>
							<Input
								placeholder='Телефон'
								name='phone'
								onChange={changeInput}
								value={ab && ab!.phone}
							/>
						</Form.Item>
						<Form.Item label='Почта'>
							<Input
								placeholder='Почта'
								name='email'
								onChange={changeInput}
								value={ab && ab!.email}
							/>
						</Form.Item>
						<Form.Item label='Как мы работаем'>
							<Form.Item label='Добавить/редактировать'>
								<Upload list={image5} onChange={setImage5} />
								<br />
								<Input
									placeholder='Этап работы'
									value={advant}
									onChange={changeAdvant}
								/>
								<br />
								<Button
									type='primary'
									onClick={() => (edit ? editAdvant() : saveAdvant())}>
									Ок
								</Button>
							</Form.Item>
							<List
								header={<div>Как мы работает</div>}
								footer=''
								bordered
								size='small'
								dataSource={ab && ab.work}
								renderItem={(item, index) => (
									<List.Item
										key={index + Date.now()}
										style={{
											display: "flex",
											justifyContent: "space-between",
										}}>
										<img
											alt=''
											style={{ width: "25px" }}
											src={
												item.icon!.length && item.icon!.includes("upload")
													? `http://localhost:5051/${item.icon}`
													: item.icon
											}
										/>
										{item.title}
										<span>
											<Button
												onClick={() => {
													setEdit(true)
													setAdvant(item.title)
													setAdvantId(index)
												}}>
												<EditOutlined />
											</Button>
											<Button onClick={() => deleteAdvant(index)}>
												<DeleteOutlined />
											</Button>
										</span>
									</List.Item>
								)}
							/>
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Сохранить
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		)
	},
)

export default About
