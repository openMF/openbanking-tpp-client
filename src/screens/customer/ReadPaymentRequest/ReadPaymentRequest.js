import React, {PureComponent} from 'react'
import Layout from "../../../components/Layout/Layout.js";
import {QRTransaction} from "../../../models/QRTransaction.js";
import {setQrData} from "../../../store/qr/actions";
import {connect} from "react-redux";
import QrReader from "react-qr-reader";

class ReadPaymentRequest extends PureComponent {

    handleScan = (data) => {
        console.log(data);
        if (data !== null) {
            console.log(QRTransaction.decode(data));
            this.props.setData(QRTransaction.decode(data));
            this.props.history.push(`/customer/approvePayment`);
        }
    };

    render() {
        return (
            <Layout>
                <QrReader
                    onScan={this.handleScan}
                    onError={(error) => console.log(error)}
                    style={{width: "80vmin", height: "80vmin"}}
                />
            </Layout>
        );
    }

}

const mapDispatchToProps = dispatch => ({
    setData: data => dispatch(setQrData(data)),
});

export default connect(null, mapDispatchToProps)(ReadPaymentRequest)
