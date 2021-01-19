import React from "react"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Col, Input, Row, Form, Button } from "antd"

const LoginForm: React.FC = (): React.ReactElement => {
	return (
		<Row
			justify='center'
			align='middle'
			style={{ height: "100vh", backgroundColor: "#fff", fontSize: "16px" }}>
			<Col span='6'>
				<Form layout='vertical'>
					<Form.Item label='Логин'>
						<Input placeholder='Логин' prefix={<UserOutlined />} />
					</Form.Item>
					<Form.Item label='Пароль'>
						<Input
							placeholder='Пароль'
							type='password'
							prefix={<LockOutlined />}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
							size='middle'
							block>
							Авторизоваться
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}

export default LoginForm
