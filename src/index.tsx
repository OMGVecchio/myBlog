'use strict'

import * as React from "react"
import { render } from "react-dom"
import { Router, Route, MemoryRouter } from 'react-router'
// history 从 react-router 库中脱离
import { createBrowserHistory } from 'history'

import { Hello } from "./components/Hello"

render(
    <Router history={ createBrowserHistory() } >
        <Route path="/" component={ Hello } />
    </Router>
    ,
    document.getElementById("app")
)