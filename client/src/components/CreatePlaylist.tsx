import SpotifyWebApi from "spotify-web-api-node";
import { CloseSharp } from "react-ionicons";
import { useState } from "react";

export function CreatePlaylist({
  api,
  tracks,
  initName,
  onClose,
}: {
  initName: string;
  api: SpotifyWebApi;
  tracks: SpotifyApi.TrackObjectFull[];
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(initName);
  const [shown, setShown] = useState(false);

  const create = async () => {
    setLoading(true);
    try {
      const res = await api.createPlaylist(name, {
        description: "Playlist created by Asen's app",
      });
      await api.addTracksToPlaylist(
        res.body.id,
        tracks.map(x => x.uri),
      );
      onClose();
    } catch (error) {
      global.window.alert(error);
    }
    setLoading(false);
  };

  const _renderBody = () => {
    return (
      <>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }} />
          <CloseSharp
            color="white"
            width="48px"
            height="48px"
            onClick={onClose}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingBottom: 64,
          }}
        >
          <h1>Name your playlist</h1>
          <input
            type="text"
            placeholder="Type name..."
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            style={{
              width: "100%",
              fontSize: 20,
              border: "none",
              color: "white",
              outline: "none",
              background: "none",
              fontWeight: "bold",
              padding: "8px 16px",
              borderBottom: "4px solid white",
            }}
          />
          <div
            style={{
              cursor: "pointer",
              marginTop: 32,
              width: "100%",
              textAlign: "center",
              padding: 16,
              borderRadius: "100vw",
              backgroundColor: "var(--color-2)",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: "bold" }} onClick={create}>
              Create Playlist
            </span>
          </div>
          <h2>Tracks in playlist</h2>
          <div>
            <div style={{ fontSize: 18, fontWeight: "bold" }}>
              {tracks.length} tracks
            </div>
            <div
              style={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => setShown(!shown)}
            >
              {shown ? "Hide" : "Show all"}
            </div>
          </div>
          {shown ? (
            <div style={{ maxHeight: 200, marginTop: 16, width: "100%" }}>
              {tracks.map((x, i) => (
                <div key={i}>
                  <h3>{x.name}</h3>
                  <div>{x.artists.map(x => x.name).join(", ")}</div>
                  {i !== tracks.length - 1 ? (
                    <hr style={{ marginTop: 16 }} />
                  ) : (
                    <div style={{ marginBottom: 64 }} />
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </>
    );
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        width: "calc(100vw - 32px)",
        height: "calc(100vh - 32px)",
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 16,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {loading ? <h1>Loading...</h1> : _renderBody()}
      </div>
    </div>
  );
}
