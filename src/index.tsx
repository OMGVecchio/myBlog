'use strict'

import * as React from "react"
import * as ReactDOM from "react-dom"
import * as ReactRouter from 'react-router'

import { Hello } from "./components/Hello"

ReactDOM.render(
    <ReactRouter.Router history={ ReactRouter.hashHistory} >
        <ReactRouter.Route path="/" component={ Hello } />
    </ReactRouter.Router>
    ,
    document.getElementById("app")
)