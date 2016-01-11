/// <reference path='../../typings/tsd.d.ts' />
import * as React from 'react';


interface ControllerProps extends React.Props<JSX.Element> {
    params: any;
}

export default class TextController extends React.Component<ControllerProps, {}> {

    render() {
        console.log(this.props.params.message);
        return (<div>Text {this.props.params.message}</div>);
    }
}