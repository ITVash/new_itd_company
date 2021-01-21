import { Button, Col, Form, Input, List, Row } from "antd"
import Rquil from "react-quill"
import React from "react"
import { observer } from "mobx-react-lite"
import portfolioStores from "../../../stores/portfolioStores"
import { IPortfolio } from "../../../Types"
import Upload from "../../Upload"
import { attachApi } from "../../../api"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

const Portfolio: React.FC = observer(
	(): React.ReactElement => {
		const portfolio: IPortfolio[] = portfolioStores.portfolio
		//const [pt, setPt] = React.useState<IPortfolio[]>([])
		const [current, setCurrent] = React.useState<IPortfolio>({ desc: "" })
		const [preview, setPreview] = React.useState<Blob | string>()
		const [proj, setProj] = React.useState<Blob | string>()

		const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
			setCurrent((prev) => ({ ...prev, [e.target.name]: e.target.value }))
		}
		const saveForm = async (): Promise<void> => {
			try {
				let pic1, pic2
				if (preview instanceof Blob) {
					const file = new FormData()
					file.append("file", preview)
					const { data } = await attachApi.create(file)
					pic1 = `${data.data.destination}/${data.data.filename}`
				}
				if (proj instanceof Blob) {
					const file = new FormData()
					file.append("file", proj)
					const { data } = await attachApi.create(file)
					pic2 = `${data.data.destination}/${data.data.filename}`
				}
				if (!current._id?.length) {
					const obj: IPortfolio = {
						title: current.title,
						desc: current.desc,
						prev: pic1 ? pic1 : current.prev,
						proj: pic2 ? pic2 : current.proj,
						link: current.link,
					}
					portfolioStores.create(obj)
					setCurrent({ desc: "" })
					setPreview(undefined)
					setProj(undefined)
				} else {
					const obj: IPortfolio = {
						_id: current._id,
						title: current.title,
						desc: current.desc,
						prev: pic1 ? pic1 : current.prev,
						proj: pic2 ? pic2 : current.proj,
						link: current.link,
					}
					portfolioStores.update(obj)
					setCurrent({ desc: "" })
					setPreview(undefined)
					setProj(undefined)
				}
			} catch (error) {
				console.error(`Ошибка: ${error}`)
			}
		}
		const cancelPortfolio = (): void => {
			setCurrent({ desc: "" })
			setPreview(undefined)
			setProj(undefined)
		}
		React.useEffect(() => {
			if (!portfolioStores.isLoad) {
				portfolioStores.fetchPortfolio()
			}
		}, [])
		/* React.useEffect(() => {
			if (portfolio) {
				setPt(portfolio)
			}
		}, [portfolio]) */
		return (
			<Row justify='center'>
				<Col span='23'>
					<h4>Портфолио</h4>
				</Col>
				<Col span='23'>
					<Form layout='vertical' onFinish={saveForm}>
						<Form.Item label='Заголовок'>
							<Input
								placeholder='Заголовок'
								name='title'
								value={current?.title}
								onChange={changeInput}
							/>
						</Form.Item>
						<Form.Item label='Описание'>
							<Rquil
								value={current && current!.desc}
								onChange={(e) => setCurrent((prev) => ({ ...prev, desc: e }))}
							/>
						</Form.Item>
						<Col
							span='23'
							style={{ display: "flex", justifyContent: "space-around" }}>
							<Col span='11'>
								<Form.Item label='Превью'>
									<Upload list={preview} onChange={setPreview} />
								</Form.Item>
							</Col>
							<Col span='11'>
								<Form.Item label='Проект'>
									<Upload list={proj} onChange={setProj} />
								</Form.Item>
							</Col>
						</Col>
						<Col span='23'>
							<Form.Item label='Ссылка'>
								<Input
									placeholder='Ссылка'
									value={current.link}
									onChange={changeInput}
									name='link'
								/>
							</Form.Item>
							<Form.Item>
								<Button type='primary' htmlType='submit'>
									Сохранить
								</Button>
								<Button
									type='primary'
									onClick={cancelPortfolio}
									style={{ marginLeft: "10px" }}>
									Отмена
								</Button>
							</Form.Item>
							<Form.Item label='Портфолио'>
								{portfolio.map((item) => (
									<p style={{ display: "none" }} key={item._id}>
										{item.title}
									</p>
								))}
								<List
									header={<div>Портфолио</div>}
									footer=''
									bordered
									size='small'
									dataSource={portfolio}
									renderItem={(item) => (
										<List.Item
											key={item._id}
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}>
											<img
												alt=''
												style={{ width: "25px" }}
												src={
													item.prev &&
													item.prev!.length &&
													item.prev!.includes("upload")
														? `https://api.itd.company:5051/${item.prev}`
														: item.prev
												}
											/>
											{item.title}
											<span>
												<Button
													onClick={() => {
														setCurrent(item)
														setPreview(item.prev)
														setProj(item.proj)
													}}>
													<EditOutlined />
												</Button>
												<Button
													onClick={() => {
														if (window.confirm("Удалить портфолио?")) {
															portfolioStores.delete(item._id!)
														}
													}}>
													<DeleteOutlined />
												</Button>
											</span>
										</List.Item>
									)}
								/>
							</Form.Item>
						</Col>
					</Form>
				</Col>
			</Row>
		)
	},
)

export default Portfolio
