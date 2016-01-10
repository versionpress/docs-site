/// <reference path='../../typings/tsd.d.ts' />
import * as React from 'react';
import { Link } from 'react-router'

export default class IndexController extends React.Component<{},{}> {
    render() {
        return <div>
                Index
            <Link to="/text">Text</Link>
            </div>;
    }
}