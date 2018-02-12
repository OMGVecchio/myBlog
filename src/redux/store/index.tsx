'use strict'

import { createStore, combineReducers } from 'redux'
import reducer from '../reducer/index'

export default createStore(reducer)