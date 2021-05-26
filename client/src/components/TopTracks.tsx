import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { RenderTrack } from "./RenderTrack";
import { ChevronDown, Add } from "react-ionicons";
import { CreatePlaylist } from "./CreatePlaylist";

const limit = 50;
type TimeRange = "long_term" | "medium_term" | "short_term";
export default function TopTracks({ api }: { api: SpotifyWebApi }) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [time_range, setTimeRange] = useState<TimeRange>("long_term");
  const [noMore, setNoMore] = useState(false);
  const [modal, setModal] = useState(false);

  const getNext = async (
    p: number,
    tr: TimeRange,
    prevTracks: SpotifyApi.TrackObjectFull[],
  ) => {
    setLoading(true);
    try {
      const res = await api.getMyTopTracks({
        time_range: tr,
        limit,
        offset: p * limit,
      });
      if (!res.body.items.length) setNoMore(true);
      else setTracks([...prevTracks, ...res.body.items]);
    } catch (error) {
      console.log(error);
      global.window.alert(error);
    }
    setLoading(false);
  };

  const changeTimeRange = (s: TimeRange) => {
    setTimeRange(s);
    setPage(0);
    setTracks([]);
    getNext(0, s, []);
  };

  useEffect(() => {
    getNext(0, time_range, []);
  }, []);

  const _renderTimeRange = (title: string, type: TimeRange) => {
    return (
      <div
        onClick={() => changeTimeRange(type)}
        style={{
          cursor: "pointer",
          marginLeft: 16,
        }}
      >
        <span style={{ fontWeight: time_range === type ? "bold" : "normal" }}>
          {title}
        </span>
      </div>
    );
  };

  return (
    <>
      <div style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: 16,
            alignItems: "flex-start",
          }}
        >
          <h1 style={{ margin: 0, marginBottom: 8 }}>Top Tracks</h1>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {_renderTimeRange("1+ Year", "long_term")}
            {_renderTimeRange("Last 6 months", "medium_term")}
            {_renderTimeRange("Last 4 weeks", "short_term")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: 16,
          }}
        >
          <div style={{ flex: 1 }} />
          <div
            style={{
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: "100vw",
              backgroundColor: "var(--color-8)",
              color: "var(--color-1)",
            }}
            onClick={() => setModal(true)}
          >
            <span
              style={{ fontWeight: "bold", marginBottom: 2, marginRight: 8 }}
            >
              Create Playlist
            </span>
            <Add style={{ color: "var(--color-1)", width: 24, height: 24 }} />
          </div>
        </div>

        {tracks.map((x, i) => (
          <RenderTrack key={i} track={x} no={i + 1} />
        ))}
        {noMore ? null : (
          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
              marginTop: 32,
            }}
            onClick={() => {
              setPage(page + 1);
              getNext(page + 1, time_range, tracks);
            }}
          >
            <div style={{ marginBottom: 16 }}>
              {loading ? "Loading..." : "Get more"}
            </div>
            {loading ? null : (
              <ChevronDown height="32px" width="32px" color="white" />
            )}
          </div>
        )}
      </div>
      {!modal ? null : (
        <CreatePlaylist
          api={api}
          tracks={tracks}
          initName={`My top songs from the last ${
            time_range === "long_term"
              ? "year"
              : time_range === "medium_term"
              ? "6 months"
              : "month"
          }`}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
}
