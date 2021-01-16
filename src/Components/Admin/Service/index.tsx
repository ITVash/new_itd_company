import { Button, Col, Form, Input, List, Row } from "antd"
import React from "react"
import Rquil from "react-quill"

const Service: React.FC = (): React.ReactElement => {
	return (
		<Row justify='center'>
			<Col span='23'>
				<h4>Услуги</h4>
			</Col>
			<Col span='23'>
				<Form layout='vertical'>
					<Form.Item label='Заголовок'>
						<Input placeholder='Заголовок' />
					</Form.Item>
					<Form.Item label='Описание'>
						<Rquil />
					</Form.Item>
					<Form.Item label='Беграунд'>
						<Input type='file' placeholder='Загрузите иконку' />
					</Form.Item>
					<Form.Item>
						<List
							header={<div>Услуги</div>}
							footer=''
							bordered
							size='small'
							dataSource={["1111", "22222", "3333"]}
							renderItem={(item) => <List.Item>{item}</List.Item>}
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
}

export default Service
