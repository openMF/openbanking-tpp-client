import React, {PureComponent} from 'react'
import Layout from "../../../components/Layout/Layout.js";
import jsQR from "jsqr";
import {setQrData} from "../../../store/qr/actions";
import {connect} from "react-redux";
import {QRTransaction} from "../../../models/QRTransaction";

class ReadPaymentRequest extends PureComponent {
  stream;

  componentDidMount() {
    const self = this;

    this.canvasElement = document.getElementById("canvas");
    this.canvas = this.canvasElement.getContext("2d");
    this.video = document.getElementById("video-display");

    navigator.mediaDevices.getUserMedia({
      video: {width: {ideal: 300}, height: {ideal: 300}, facingMode: "environment"},
      audio: false
    })
        .then(function (stream) {
          if (self.video) {
            self.video.srcObject = stream;
            self.stream = stream.getVideoTracks()[0];
            requestAnimationFrame(self.tick);
          }
        })
        .catch(function (err) {
          /* handle the error */
        });
  };

  tick = () => {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.canvasElement.height = this.video.videoHeight;
      this.canvasElement.width = this.video.videoWidth;
      this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        this.stream.stop();
        this.props.setData(QRTransaction.decode(code.data));
        this.props.history.push(`/${ this.props.match.params.colorTheme }/customer/approvePayment`);
        return;
      }
    }
    requestAnimationFrame(this.tick);

  };

  render() {
    return (<Layout>
      <h1>ReadPaymentRequest</h1>
      <canvas id="canvas" hidden/>
      <video id="video-display" autoPlay={true} width="300px" height="300px" playsInline={true}/>
    </Layout>)
  }
}

const mapDispatchToProps = dispatch => ({
  setData: data => dispatch(setQrData(data)),
});

export default connect(null, mapDispatchToProps)(ReadPaymentRequest)
