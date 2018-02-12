'use strict'

import * as React from "react"
import { render } from "react-dom"
import { Router, Route, MemoryRouter } from 'react-router'
// history 从 react-router 库中脱离
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'

import store from './redux/store/index'

import { Hello } from "./components/Hello"

render(
    <Provider store={ store }>
        <Router history={ createBrowserHistory() } >
            <Route path="/" component={ Hello } />
        </Router>
    </Provider>
    ,
    document.getElementById("app")
)