import React from "react";
import { albumDate, fromMs } from "../utils/formatTime";

interface Props {
  track: SpotifyApi.TrackObjectFull;
  no: number;
  renderButton?: () => JSX.Element;
}
export function RenderTrack({
  track,
  no,
  renderButton = () => <div></div>,
}: Props) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-2)",
        padding: 16,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        marginBottom: 16,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/*  Popularity */}
      <div
        style={{
          height: 4,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: track.popularity + "%",
          backgroundColor: "var(--color-6)",
        }}
      ></div>

      {/* Track number */}
      <div
        style={{
          width: 50,
          fontSize: 20,
          display: "flex",
          marginRight: 16,
          fontWeight: "bold",
          justifyContent: "center",
        }}
      >
        {no}.
      </div>

      {/* Track info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <a href={track.album.external_urls.spotify}>
          <img
            width="100px"
            height="100px"
            src={track.album.images[0].url}
            style={{ marginRight: 16 }}
          />
        </a>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap",
              marginBottom: 4,
            }}
          >
            <h2 style={{ margin: 0, padding: 0, marginRight: 8 }}>
              {track.name}
            </h2>
            <div>
              {track.artists.map((x, i) => (
                <span key={`artist_${i}_track_${no}`}>
                  <a href={x.external_urls.spotify}>{x.name}</a>
                  <span style={{ marginRight: 4 }}>
                    {i !== track.artists.length - 1 ? "," : ""}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <a
            href={track.album.external_urls.spotify}
            style={{ fontWeight: "bold" }}
          >
            {track.album.name} ({albumDate(track.album.release_date)})
          </a>

          <div style={{ marginTop: 4 }}>{fromMs(track.duration_ms)}</div>
        </div>
      </div>

      {/* Link buton */}
      {renderButton()}
    </div>
  );
}
