import React, {PureComponent} from 'react';
import {Page, Toolbar} from "react-onsenui";

export class Layout extends PureComponent {

    render() {
        return (<Page renderToolbar={() => <Toolbar>
            <div className="center">Bank name</div>
        </Toolbar>}>
            <div>{this.props.children}</div>
        </Page>)
    }

}