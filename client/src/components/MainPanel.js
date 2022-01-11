import React, { useState, useEffect } from "react";
import StatusDisplay from "./StatusDisplay";
import axios from "axios";

// const api = axios.create({ baseURL: "http://localhost:3001/api/" });

const MainPanel = () => {
  const [status, setStatus] = useState("idle");
  const [webSocket, setWebSocket] = useState(null);
  const [code, setCode] = useState("");

  const run_pars = async () => {
    setStatus("logging");
    const response = await (
      await axios.get("http://localhost:3001/api/start")
    ).data;
    console.log(response);
    setStatus("auth");
    setWebSocket(response.wsEndpoint);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("parsing");
    const payload = {
      code,
      webSocket,
    };

    // console.log(to_send.get("code"));
    await await axios.post("http://localhost:3001/api/auth", payload);
    setStatus("done");
  };

  const handleChange = (e) => {
    setCode(Number(e.target.value));
  };

  return (
    <div className="container">
      <div className="left_half">
        <button onClick={run_pars}>Run Parser</button>
      </div>
      <div className="right_half">
        <StatusDisplay
          status={status}
          // formState={formState}
          webSocket={webSocket}
          handleSubmit={handleSubmit}
          code={code}
          handleChange={handleChange}
        ></StatusDisplay>
      </div>
    </div>
  );
};

export default MainPanel;
