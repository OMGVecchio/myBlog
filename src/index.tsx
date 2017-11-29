'use strict'

import * as React from "react"
import * as ReactDOM from "react-dom"
import * as ReactRouter from 'react-router'
import * as Redux from 'react-redux'

// import store from 'STORE/index'

import { Hello } from "./components/Hello"

ReactDOM.render(
    <Redux.Provider>
        <Hello compiler="TypeScript" framework="React" />
    </Redux.Provider>
    ,
    document.getElementById("app")
)