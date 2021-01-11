import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "mobx-react"

import stores from "./stores"

import "antd/dist/antd.css"
import "./index.scss"
import App from "./App"

ReactDOM.render(
	<Provider {...stores}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root"),
)
