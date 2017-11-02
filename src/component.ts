'use strict'

import * as React from 'react'

export interface HelloProperty {
    name: string;
    age: number
}

export default class Hello extends React.Component<HelloProperty, undefined> {
    render() {
        return 'sd'
    }
}