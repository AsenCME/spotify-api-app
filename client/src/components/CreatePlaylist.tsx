import SpotifyWebApi from "spotify-web-api-node";
import { Track } from "../interfaces/Track";
import { CloseSharp } from "react-ionicons";

export function CreatePlaylist({
  api,
  tracks,
  onClose,
}: {
  api: SpotifyWebApi;
  tracks: Track[];
  onClose: () => void;
}) {
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
          }}
        >
          <h1>Name your playlist</h1>
          <input
            type="text"
            placeholder="Type name..."
            style={{
              fontSize: 20,
              background: "none",
              padding: "8px 16px",
              outline: "none",
              border: "none",
              borderBottom: "4px solid white",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </div>
      </div>
    </div>
  );
}
