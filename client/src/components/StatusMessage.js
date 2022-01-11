import React from "react";

const StatusMessage = ({ status }) => {
  let message;
  switch (status) {
    case "idle":
      message = <>{"<---- Press to start parsing"}</>;
      break;
    case "logging":
      message = <>{"Logging in, Please wait..."}</>;
      break;
    case "parsing":
      message = <>{"Parsing, Please wait..."}</>;
      break;
    case "done":
      message = <>{"Email Organized!"}</>;
      break;

    default:
      break;
  }

  return <div>{message}</div>;
};

export default StatusMessage;
