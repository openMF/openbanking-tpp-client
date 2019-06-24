import React from "react";
import { AlertDialog, Button } from "react-onsenui";

const ErrorDialog = props => {
  return (
    <AlertDialog isOpen={props.isOpen} onCancel={props.close} cancelable>
      <div className="alert-dialog-title">{props.title || "Alert!"}</div>
      <div className="alert-dialog-content">
        {props.message || "Something went wrong, please try again."}
      </div>
      <div className="alert-dialog-footer">
        <Button onClick={props.close} className="alert-dialog-button">
          Ok
        </Button>
      </div>
    </AlertDialog>
  );
};

export default ErrorDialog;
