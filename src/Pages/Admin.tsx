import Layout, { Content, Footer, Header } from "antd/lib/layout/layout"
import { Menu } from "antd"
import Sider from "antd/lib/layout/Sider"
import React from "react"
import { Helmet } from "react-helmet"
import {
	About,
	Home,
	LoginForm,
	Portfolio,
	Service,
	SiteType,
	SubService,
} from "../Components/Admin"
import "react-quill/dist/quill.snow.css"

import "./styles/admin.scss"
const Admin: React.FC = (): React.ReactElement => {
	const [menu, setMenu] = React.useState<string>("home")
	let login: boolean = true
	if (!login) {
		return <LoginForm />
	}
	return (
		<>
			<Helmet>
				<title>Админка - ITD Company</title>
			</Helmet>
			<Layout
				className='admin'
				style={{
					backgroundColor: "#fff",
					fontSize: "16px",
					minHeight: "100vh",
				}}>
				<Header style={{ color: "#fff", fontWeight: 600 }}>
					Админка ITD Company
				</Header>
				<Layout style={{ flex: "1 1 auto" }}>
					<Sider
						style={{
							fontSize: "16px",
						}}>
						<Menu mode='vertical' theme='dark' defaultSelectedKeys={["1"]}>
							<Menu.Item
								key={1}
								onClick={(): void => {
									setMenu("home")
								}}>
								Главная
							</Menu.Item>
							<Menu.Item
								key={2}
								onClick={(): void => {
									setMenu("about")
								}}>
								О Нас
							</Menu.Item>
							<Menu.Item
								key={3}
								onClick={(): void => {
									setMenu("portfolio")
								}}>
								Портфолио
							</Menu.Item>
							<Menu.Item
								key={4}
								onClick={(): void => {
									setMenu("service")
								}}>
								Услуги
							</Menu.Item>
							<Menu.Item
								key={5}
								onClick={(): void => {
									setMenu("subservice")
								}}>
								Саб-Услуги
							</Menu.Item>
							<Menu.Item
								key={6}
								onClick={(): void => {
									setMenu("sitetype")
								}}>
								Типы сайтов
							</Menu.Item>
						</Menu>
					</Sider>
					<Content>
						{menu === "home" && <Home />}
						{menu === "about" && <About />}
						{menu === "portfolio" && <Portfolio />}
						{menu === "service" && <Service />}
						{menu === "subservice" && <SubService />}
						{menu === "sitetype" && <SiteType />}
					</Content>
				</Layout>
				<Footer
					style={{ color: "#fff", justifyContent: "center", display: "flex" }}>
					ITD Company
				</Footer>
			</Layout>
		</>
	)
}

export default Admin
