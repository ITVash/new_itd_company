import { Button, Col, Form, Input, List, Row, Select } from "antd"
import { observer } from "mobx-react-lite"
import React from "react"
import Rquil from "react-quill"
import { IService, ISubService } from "../../../Types"
import serviceStore from "../../../stores/serviceStores"
import subserviceStore from "../../../stores/subserviceStores"
import { SelectValue } from "antd/lib/select"
import Upload from "../../Upload"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { attachApi } from "../../../api"

const SubService: React.FC = observer(
	(): React.ReactElement => {
		const service: IService[] = serviceStore.service
		const subservice: ISubService[] = subserviceStore.subservice
		const [serviceID, setserviceID] = React.useState<
			string | SelectValue | undefined
		>(undefined)
		const [img1, setImg1] = React.useState<Blob | string>()
		const [img2, setImg2] = React.useState<Blob | string>()
		const [current, setCurrent] = React.useState<ISubService>({
			text1: "",
			text2: "",
			body: "",
		})
		const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
			setCurrent((prev) => ({ ...prev, [e.target.name]: e.target.value }))
		}
		const saveForm = async (): Promise<void> => {
			try {
				let pic1, pic2
				if (img1 instanceof Blob) {
					const file = new FormData()
					file.append("file", img1)
					const { data } = await attachApi.create(file)
					pic1 = `${data.data.destination}/${data.data.filename}`
				}
				if (img2 instanceof Blob) {
					const file = new FormData()
					file.append("file", img2)
					const { data } = await attachApi.create(file)
					pic2 = `${data.data.destination}/${data.data.filename}`
				}

				if (!current._id?.length) {
					const obj: ISubService = {
						title: current.title,
						serviceID: String(serviceID).length
							? String(serviceID)
							: current.serviceID,
						img1: pic1 ? pic1 : current.img1,
						img2: pic2 ? pic2 : current.img2,
						text1: current.text1,
						text2: current.text2,
						body: current.body,
					}
					await subserviceStore.create(obj)
					setCurrent({
						text1: "",
						text2: "",
						body: "",
					})
					setImg1(undefined)
					setImg2(undefined)
					setserviceID("")
				} else {
					const obj: ISubService = {
						_id: current._id,
						title: current.title,
						serviceID: String(serviceID).length
							? String(serviceID)
							: current.serviceID,
						img1: pic1 ? pic1 : current.img1,
						img2: pic2 ? pic2 : current.img2,
						text1: current.text1,
						text2: current.text2,
						body: current.body,
					}
					subserviceStore.update(obj)
					setCurrent({
						text1: "",
						text2: "",
						body: "",
					})
					setImg1(undefined)
					setImg2(undefined)
					setserviceID(undefined)
				}
			} catch (error) {
				console.error(`Ошибка: ${error}`)
			}
		}

		React.useEffect(() => {
			if (!serviceStore.isLoad) {
				serviceStore.fetchService()
			}
			if (!subserviceStore.isLoad) {
				subserviceStore.fetchService()
			}
		}, [])
		return (
			<Row justify='center'>
				<Col span='23'>
					<h4>Саб Сервисы</h4>
				</Col>
				<Col span='23'>
					<Form layout='vertical' onFinish={saveForm}>
						<Form.Item label='Заголовок'>
							<Input
								placeholder='Заголовок'
								value={current.title}
								onChange={changeInput}
								name='title'
							/>
						</Form.Item>
						<Form.Item label='Описание'>
							<Rquil
								value={current.body}
								onChange={(e) => setCurrent((prev) => ({ ...prev, body: e }))}
							/>
						</Form.Item>
						<Form.Item label='Услуга'>
							<Select
								placeholder='Выберете услугу'
								value={serviceID}
								onChange={(e) => setserviceID(e)}>
								{service.length &&
									service.map((item, index) => (
										<Select.Option key={index} value={item._id!}>
											{item.title}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
						<Col
							span='23'
							style={{ display: "flex", justifyContent: "space-around" }}>
							<Col span='11'>
								<Form.Item label='Картинка 1'>
									<Upload list={img1} onChange={setImg1} />
								</Form.Item>
							</Col>
							<Col span='11'>
								<Form.Item label='Картинка 2'>
									<Upload list={img2} onChange={setImg2} />
								</Form.Item>
							</Col>
						</Col>
						<Form.Item label='Текст 1'>
							<Rquil
								value={current.text1}
								onChange={(e) => setCurrent((prev) => ({ ...prev, text1: e }))}
							/>
						</Form.Item>
						<Form.Item label='Текст 2'>
							<Rquil
								value={current.text2}
								onChange={(e) => setCurrent((prev) => ({ ...prev, text2: e }))}
							/>
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Сохранить
							</Button>
							<Button
								type='primary'
								style={{ marginLeft: "10px" }}
								onClick={(): void => {
									setCurrent({})
									setImg1(undefined)
									setImg2(undefined)
								}}>
								Отмена
							</Button>
						</Form.Item>
						{subservice.map((item) => (
							<p style={{ display: "none" }} key={item._id}>
								{item.title}
							</p>
						))}
						<List
							header={<div>Саб услуги</div>}
							footer=''
							bordered
							size='small'
							dataSource={subservice}
							renderItem={(item, index) => (
								<List.Item
									key={index + Date.now() + Math.round(Math.random() * 10)}
									style={{
										display: "flex",
										justifyContent: "space-between",
									}}>
									<img
										alt=''
										style={{ width: "25px" }}
										src={
											item.img1 &&
											item.img1!.length &&
											item.img1!.includes("upload")
												? `https://api.itd.company:5051/${item.img1}`
												: item.img1
										}
									/>
									{item.title}
									<span>
										<Button
											onClick={() => {
												setCurrent(item)
												setImg1(item.img1)
												setImg2(item.img2)
											}}>
											<EditOutlined />
										</Button>
										<Button
											onClick={() => {
												if (window.confirm("Удалить портфолио?")) {
													subserviceStore.delete(item._id!)
												}
											}}>
											<DeleteOutlined />
										</Button>
									</span>
								</List.Item>
							)}
						/>
					</Form>
				</Col>
			</Row>
		)
	},
)

export default SubService
