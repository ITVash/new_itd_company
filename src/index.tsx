import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

import stores from "./stores"

import "antd/dist/antd.css"
import "./index.scss"
import App from "./App"
console.log("stores", stores)
ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById("root"),
)
