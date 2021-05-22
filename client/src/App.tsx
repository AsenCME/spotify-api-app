import React from "react";

import "./App.css";
import Dash from "./Dash";
import Login from "./Login";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return code ? <Dash {...{ code }} /> : <Login />;
}

export default App;
