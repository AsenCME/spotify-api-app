import React from "react";

import "./App.css";
import Dash from "./Dash";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return code ? (
    <Dash {...{ code }} />
  ) : (
    <div>
      <a href={AUTH_URL}>Login to Spotify</a>
    </div>
  );
}

export default App;
