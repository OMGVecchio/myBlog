'use strict'

import { render } from 'react-dom'
import Hello from './component'

interface Person {
    name: string,
    age: number
}

function hello(t: Person) {
    console.log(t.name)
}

var ss = {
    name: 'asd',
    age: 12,
    s:1
}

hello(ss)

render(
    <Hello></Hello>,
    document.getElementById('app')
)