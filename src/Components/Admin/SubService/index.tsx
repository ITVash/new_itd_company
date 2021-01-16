import { Button, Col, Form, Input, List, Row, Select } from "antd"
import React from "react"
import Rquil from "react-quill"

const SubService: React.FC = (): React.ReactElement => {
	return (
		<Row justify='center'>
			<Col span='23'>
				<h4>Саб Сервисы</h4>
			</Col>
			<Col span='23'>
				<Form layout='vertical'>
					<Form.Item label='Заголовок'>
						<Input placeholder='Заголовок' />
					</Form.Item>
					<Form.Item label='Описание'>
						<Rquil />
					</Form.Item>
					<Form.Item label='Услуга'>
						<Select placeholder='Выберете услугу'>
							<Select.Option key={1} value='Web-Программирование'>
								Web-Программирование
							</Select.Option>
						</Select>
					</Form.Item>
					<Col
						span='23'
						style={{ display: "flex", justifyContent: "space-around" }}>
						<Col span='11'>
							<Form.Item label='Картинка 1'>
								<Input type='file' placeholder='Заголовок' />
							</Form.Item>
						</Col>
						<Col span='11'>
							<Form.Item label='Картинка 2'>
								<Input type='file' placeholder='Заголовок' />
							</Form.Item>
						</Col>
					</Col>
					<Form.Item label='Текст 1'>
						<Rquil />
					</Form.Item>
					<Form.Item label='Текст 2'>
						<Rquil />
					</Form.Item>
					<List
						header={<div>Саб услуги</div>}
						footer=''
						bordered
						size='small'
						dataSource={["1111", "22222", "3333"]}
						renderItem={(item) => <List.Item>{item}</List.Item>}
					/>
					<Form.Item>
						<Button type='primary' htmlType='submit'>
							Сохранить
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}

export default SubService
