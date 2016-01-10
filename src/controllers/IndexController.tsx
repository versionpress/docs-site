/// <reference path='../../typings/tsd.d.ts' />
import * as React from 'react';
import { Link } from 'react-router'


export default class IndexController extends React.Component<{},{}> {
    render() {
        return (
            <div>
            <h1>App</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="text">Text</Link></li>
            </ul>
            </div>);
    }
}