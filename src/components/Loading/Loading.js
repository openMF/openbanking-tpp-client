import React from "react";
import { Modal, ProgressCircular } from "react-onsenui";

const Loading = props => {
  return (
    <Modal isOpen={props.isOpen}>
      <ProgressCircular indeterminate />
    </Modal>
  );
};

export default Loading;
