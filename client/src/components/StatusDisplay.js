import React, { useEffect, useState } from "react";
import StatusMessage from "./StatusMessage";
import axios from "axios";

const StatusDisplay = (props) => {
  return (
    <div className="status">
      <StatusMessage status={props.status}></StatusMessage>
      {props.status === "auth" && (
        <form
          className={props.status !== "auth" ? "auth_form_hidden" : ""}
          onSubmit={props.handleSubmit}
        >
          <label>Please, authenticate</label>
          <input
            type="number"
            id="auth"
            value={props.code}
            onChange={props.handleChange}
          ></input>
          <input type="submit"></input>
        </form>
      )}
    </div>
  );
};

export default StatusDisplay;
