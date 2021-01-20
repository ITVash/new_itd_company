import React from "react"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Col, Input, Row, Form, Button } from "antd"
import { observer } from "mobx-react-lite"
import userStores from "../../../stores/userStores"
import { generateMD5 } from "../../../utils/generateMD5"

const LoginForm: React.FC = observer(
	(): React.ReactElement => {
		const [auth, setAuth] = React.useState<{
			username?: string
			password?: string
		}>({})
		const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
			setAuth((prev) => ({ ...prev, [e.target.name]: e.target.value }))
		}

		const saveForm = (): void => {
			userStores.signIn({
				username: auth.username,
				password: generateMD5(auth.password + "RGYKcVeU2vpj4nv2"),
			})
			console.log("admin", generateMD5(auth.password + "RGYKcVeU2vpj4nv2"))
			setAuth({})
		}
		return (
			<Row
				justify='center'
				align='middle'
				style={{ height: "100vh", backgroundColor: "#fff", fontSize: "16px" }}>
				<Col span='6'>
					<Form layout='vertical' onFinish={saveForm}>
						<Form.Item label='Логин'>
							<Input
								placeholder='Логин'
								prefix={<UserOutlined />}
								name='username'
								value={auth.username}
								onChange={changeInput}
							/>
						</Form.Item>
						<Form.Item label='Пароль'>
							<Input
								placeholder='Пароль'
								type='password'
								prefix={<LockOutlined />}
								name='password'
								value={auth.password}
								onChange={changeInput}
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
	},
)

export default LoginForm
