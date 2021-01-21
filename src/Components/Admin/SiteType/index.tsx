import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, List, Row } from "antd"
import { observer } from "mobx-react-lite"
import React from "react"
import Rquil from "react-quill"
import { attachApi } from "../../../api"
import siteTypeStore from "../../../stores/siteTypeStores"
import { ISiteType } from "../../../Types"
import Upload from "../../Upload"

const SiteType: React.FC = observer(
	(): React.ReactElement => {
		const types: ISiteType[] = siteTypeStore.sitetype
		const [current, setCurrent] = React.useState<ISiteType>({ desc: "" })
		const [icon, setIcon] = React.useState<Blob | string>()
		const [exa, setExa] = React.useState<Blob[] | string[]>([])

		const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
			setCurrent((prev) => ({ ...prev, [e.target.name]: e.target.value }))
		}
		const saveForm = async (): Promise<void> => {
			try {
				let pic1,
					pic2: string[] = []
				if (icon instanceof Blob) {
					const file = new FormData()
					file.append("file", icon)
					const { data } = await attachApi.create(file)
					pic1 = `${data.data.destination}/${data.data.filename}`
				}
				if (exa && exa[0] instanceof Blob) {
					const file = new FormData()
					exa.forEach((fileImg: any) => file.append("file", fileImg))

					const { data } = await attachApi.createMany(file)
					console.log("data", data)
					data.data.forEach((img: any) => {
						const item: string = `${img.destination}/${img.filename}`
						pic2.push!(item)
						console.log("pic2", item)
					})
				}

				if (!current._id?.length) {
					const obj: ISiteType = {
						title: current.title,
						desc: current.desc,
						icon: pic1 ? pic1 : current.icon,
						example: pic2!.length ? pic2! : current.example,
					}
					await siteTypeStore.create(obj)
					setCurrent({ desc: "" })
					setIcon(undefined)
					setExa([])
				} else {
					const obj: ISiteType = {
						_id: current._id,
						title: current.title,
						desc: current.desc,
						icon: pic1 ? pic1 : current.icon,
						example: pic2 && pic2,
					}
					siteTypeStore.update(obj)
					setCurrent({ desc: "" })
					setIcon(undefined)
					setExa([])
				}
			} catch (error) {
				console.error(`Ошибка сохранения формы: ${error}`)
			}
		}
		React.useEffect(() => {
			!siteTypeStore.isLoad && siteTypeStore.fetchService()
		}, [])
		return (
			<Row justify='center'>
				<Col span='23'>
					<h4>Типы сайтов</h4>
				</Col>
				<Col span='23'>
					<Form layout='vertical' onFinish={saveForm}>
						<Form.Item label='Заголовок'>
							<Input
								placeholder='Заголовок'
								name='title'
								value={current.title}
								onChange={changeInput}
							/>
						</Form.Item>
						<Form.Item label='Описание'>
							<Rquil
								value={current.desc}
								onChange={(e) => setCurrent((prev) => ({ ...prev, desc: e }))}
							/>
						</Form.Item>
						<Form.Item label='Иконка'>
							<Upload list={icon} onChange={setIcon} />
						</Form.Item>
						<Form.Item label='Добавить пример' style={{ display: "flex" }}>
							<Upload multiple listArr={exa} onChange={setExa} />
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
									setIcon(undefined)
									setExa([])
								}}>
								Отмена
							</Button>
						</Form.Item>
						{types.map((item) => (
							<p style={{ display: "none" }} key={item._id}>
								{item.title}
							</p>
						))}
						<Form.Item>
							<List
								header={<div>Типы сайтов</div>}
								footer=''
								bordered
								size='small'
								dataSource={types}
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
												item.icon &&
												item.icon!.length &&
												item.icon!.includes("upload")
													? `https://api.itd.company:5051/${item.icon}`
													: item.icon
											}
										/>
										{item.title}
										<span>
											<Button
												onClick={() => {
													setCurrent(item)
													setIcon(item.icon)
													setExa(item.example!)
												}}>
												<EditOutlined />
											</Button>
											<Button
												onClick={() => {
													if (window.confirm("Удалить портфолио?")) {
														siteTypeStore.delete(item._id!)
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

export default SiteType
