import React, {PureComponent} from 'react'
import {Layout} from "../Layout/Layout.js";
import {Button} from "react-onsenui";
import {Redirect} from "react-router-dom";
import s from './PaymentComplete.css';

export class PaymentComplete extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            referrer: null,
        }
    }

    modifyState = (urlType) => {
        this.setState({
            navigate: true,
            referrer: '/'+urlType});
    };

    render() {
        const { location } = this.props;
        const urlType = location.pathname.split('/')[1];
        let text = '';

        switch (urlType) {
            case 'customer':
                text = "Payment successful";
                break;
            case 'merchant':
                text = "Payment received";
                break;
        }

        return (<Layout>
            <div className="wrapper">
                <div className="text">
                    <h1>{text}</h1>
                </div>
                <div className="center">
                    <img className="checkMark"
                         src="https://www.pngkey.com/png/full/11-116060_check-mark-png.png"
                         alt="Success"/>
                </div>
                {this.state.navigate === true ?
                    <Redirect to={this.state.referrer}/>
                    :
                    <Button modifier="large--cta" onClick={() => {
                        this.modifyState(urlType)
                    }}> OK
                    </Button>
                }
            </div>
        </Layout>)
    }
}