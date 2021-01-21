import { Button, Col, Form, Input, List, Row } from "antd"
import { observer } from "mobx-react-lite"
import React from "react"
import Rquil from "react-quill"
import HomeStores from "../../../stores/homeStores"
import { IHome, TAdvant } from "../../../Types"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { attachApi } from "../../../api"

const Home: React.FC = observer(
	(): React.ReactElement => {
		const home: IHome = HomeStores.home[0]
		const [advant, setAdvant] = React.useState<string>("")
		const [advantId, setAdvantId] = React.useState<number>()
		const [edit, setEdit] = React.useState<boolean>(false)
		const [image, setImage] = React.useState<Blob>()
		if (!HomeStores!.isLoad) {
			return <div>...Загрузка</div>
		}
		const saveForm = (): void => {
			HomeStores.update()
		}
		const addImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
			const file = e.target.files
			setImage(file![0])
		}
		const editAdvant = async (): Promise<void> => {
			try {
				if (advant === "") return alert("Преимущество не может быть пустым")
				const dataImg = new FormData()
				if (image) {
					dataImg.append("file", image!)
					const { data } = await attachApi.create(dataImg)
					const obj: TAdvant = {
						icon: `${data.data.destination}/${data.data.filename}`,
						title: advant,
					}
					HomeStores.editAdvant(advantId!, obj)
				} else {
					const obj: TAdvant = {
						title: advant,
					}
					HomeStores.editAdvant(advantId!, obj)
				}
				setAdvant("")
				setAdvantId(undefined)
				setImage(undefined)
				setEdit(false)
				alert("Преимущество изменено!")
			} catch (error) {
				console.log("Ошибка", error)
			}
		}
		const changeAdvant = (e: React.ChangeEvent<HTMLInputElement>): void => {
			setAdvant(e.target.value)
		}
		const deleteAdvant = (id: number): void => {
			if (window.confirm("Удалить преимущество?")) {
				HomeStores.delAdvant(id)
			}
		}
		const saveAdvant = async (): Promise<void> => {
			try {
				if (advant === "") return alert("Преимущество не может быть пустым")
				const dataImg = new FormData()
				if (image) {
					dataImg.append("file", image!)
					const { data } = await attachApi.create(dataImg)
					const obj: TAdvant = {
						icon: `${data.data.destination}/${data.data.filename}`,
						title: advant,
					}
					HomeStores.addAdvant(obj)
				} else {
					const obj: TAdvant = {
						title: advant,
					}
					HomeStores.addAdvant(obj)
				}
				setAdvant("")
				setImage(undefined)
				alert("Преимущество добавленно!")
			} catch (error) {}
		}
		/* React.useEffect(() => {
			window.scrollTo(0, 0)
		}, []) */
		return (
			<Row justify='center'>
				<Col span='23'>
					<h4>Главная</h4>
				</Col>
				<Col span='23'>
					<Form layout='vertical' onFinish={saveForm}>
						<Form.Item
							label='Описание услуги (страница услуги)'
							style={{ fontSize: "16px" }}>
							<Rquil
								value={home.serviceDesc}
								onChange={HomeStores.setService}
							/>
						</Form.Item>
						<Form.Item label='Почему мы?'>
							<Rquil value={home.whyWe} onChange={HomeStores.setWhy} />
						</Form.Item>
						<Form.Item label='Добавить/редактировать преимущества'>
							<Input
								type='file'
								placeholder='Загрузите иконку'
								onChange={addImage}
							/>
							<br />
							<Input
								placeholder='Преимущества'
								value={advant}
								onChange={changeAdvant}
								//onPressEnter={saveAdvant}
							/>
							<br />
							<Button onClick={() => (edit ? editAdvant() : saveAdvant())}>
								Ok
							</Button>
						</Form.Item>
						<Form.Item label='Преимущества'>
							<List
								header={<div>Преимущества</div>}
								footer=''
								bordered
								size='small'
								dataSource={home.advantages}
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
													? `https://api.itd.company:5051/${item.icon}`
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
						<Form.Item label='Социальные сети'>
							<Form.Item label='VK'>
								<Input
									value={home.vk}
									name='vk'
									onChange={HomeStores.setChange}
								/>
							</Form.Item>
							<Form.Item label='Facebook'>
								<Input
									value={home.fb}
									name='fb'
									onChange={HomeStores.setChange}
								/>
							</Form.Item>
							<Form.Item label='Instagram'>
								<Input
									value={home.inst}
									name='inst'
									onChange={HomeStores.setChange}
								/>
							</Form.Item>
							<Form.Item label='Be'>
								<Input
									value={home.be}
									name='be'
									onChange={HomeStores.setChange}
								/>
							</Form.Item>
							<Form.Item label='Tg'>
								<Input
									value={home.tg}
									name='tg'
									onChange={HomeStores.setChange}
								/>
							</Form.Item>
							<Form.Item label='Pin'>
								<Input
									value={home.pin}
									name='pin'
									onChange={HomeStores.setChange}
								/>
							</Form.Item>
							<Form.Item label='Twit'>
								<Input
									value={home.twit}
									name='twit'
									onChange={HomeStores.setChange}
								/>
							</Form.Item>
							<Form.Item label='Youtube'>
								<Input
									value={home.youtube}
									name='youtube'
									onChange={HomeStores.setChange}
								/>
							</Form.Item>
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

export default Home
