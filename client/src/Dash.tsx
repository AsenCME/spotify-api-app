import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { CustomPlaylist } from "./components/CustomPlaylist";
import Header from "./components/Header";
import TopTracks from "./components/TopTracks";
import { Me } from "./interfaces/Me";
import { Page } from "./interfaces/Page";
import useAuth from "./useAuth";

const api = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
  clientSecret: "524fc97a2763460598a3420b7253ee81",
  redirectUri: "http://localhost:3000",
});

export default function Dash({ code }: { code: string }) {
  const { accessToken, refreshToken } = useAuth(code);
  const [me, setMe] = useState<Me | null>(null);
  const [page, setPage] = useState<Page>("top_tracks");

  const _renderBody = () => {
    if (page === "top_tracks") return <TopTracks api={api} />;
    else if (page === "custom_playlist") return <CustomPlaylist api={api} />;
    else return null;
  };

  useEffect(() => {
    if (!accessToken) return;
    api.setAccessToken(accessToken);
    api.setRefreshToken(refreshToken);
    (async () => {
      const res = await api.getMe();
      setMe({
        id: res.body.id,
        name: res.body.display_name || "no name",
        image: !res.body.images?.length ? "" : res.body.images[0].url,
        followers: res.body.followers?.total || 0,
      });
    })();
  }, [accessToken]);

  if (!api.getAccessToken()) return null;
  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      {!me ? null : <Header me={me} page={page} changePage={p => setPage(p)} />}
      {_renderBody()}
    </div>
  );
}
