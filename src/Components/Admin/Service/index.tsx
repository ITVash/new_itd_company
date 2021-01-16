import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, List, Row } from "antd"
import { observer } from "mobx-react-lite"
import React from "react"
import { attachApi } from "../../../api"
import serviceStores from "../../../stores/serviceStores"
import { IService } from "../../../Types"
import Upload from "../../Upload"

const Service: React.FC = observer(
	(): React.ReactElement => {
		const service: IService[] = serviceStores.service
		const [current, setCurrent] = React.useState<IService>({})
		const [bac, setBac] = React.useState<Blob | string>()
		const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
			setCurrent((prev) => ({ ...prev, [e.target.name]: e.target.value }))
		}
		const saveForm = async (): Promise<void> => {
			try {
				let pic1
				if (bac instanceof Blob) {
					const file = new FormData()
					file.append("file", bac)
					const { data } = await attachApi.create(file)
					pic1 = `${data.data.destination}/${data.data.filename}`
				}

				if (!current._id?.length) {
					const obj: IService = {
						title: current.title,
						background: pic1 ? pic1 : current.background,
					}
					serviceStores.create(obj)
					setCurrent({})
					setBac(undefined)
				} else {
					const obj: IService = {
						_id: current._id,
						title: current.title,
						background: pic1 ? pic1 : current.background,
					}
					serviceStores.update(obj)
					setCurrent({})
					setBac(undefined)
				}
			} catch (error) {
				console.error(`Ошибка: ${error}`)
			}
		}
		React.useEffect(() => {
			!serviceStores.isLoad && serviceStores.fetchService()
		}, [])
		return (
			<Row justify='center'>
				<Col span='23'>
					<h4>Услуги</h4>
				</Col>
				<Col span='23'>
					<Form layout='vertical' onFinish={saveForm}>
						<Form.Item label='Заголовок'>
							<Input
								placeholder='Заголовок'
								value={current.title}
								name='title'
								onChange={changeInput}
							/>
						</Form.Item>
						<Form.Item label='Беграунд'>
							<Upload list={bac} onChange={setBac} />
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
									setBac(undefined)
								}}>
								Отмена
							</Button>
						</Form.Item>
						<Form.Item>
							{service.map((item) => (
								<p style={{ display: "none" }} key={item._id}>
									{item.title}
								</p>
							))}
							<List
								header={<div>Услуги</div>}
								footer=''
								bordered
								size='small'
								dataSource={service}
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
												item.background &&
												item.background!.length &&
												item.background!.includes("upload")
													? `http://localhost:5051/${item.background}`
													: item.background
											}
										/>
										{item.title}
										<span>
											<Button
												onClick={() => {
													setCurrent(item)
													setBac(item.background)
												}}>
												<EditOutlined />
											</Button>
											<Button
												onClick={() => {
													if (window.confirm("Удалить портфолио?")) {
														serviceStores.delete(item._id!)
													}
												}}>
												<DeleteOutlined />
											</Button>
										</span>
									</List.Item>
								)}
							/>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		)
	},
)

export default Service
