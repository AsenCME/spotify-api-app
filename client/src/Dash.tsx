import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";

const api = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
  clientSecret: "524fc97a2763460598a3420b7253ee81",
  redirectUri: "http://localhost:3000",
});

export default function Dash({ code }: { code: string }) {
  const accessToken = useAuth(code);

  useEffect(() => {
    if (!accessToken) return;
    api.setAccessToken(accessToken);
  }, [accessToken]);
  return <div>{accessToken}</div>;
}
