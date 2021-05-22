import { useRef, useState } from "react";
import { Track } from "../interfaces/Track";
import { albumDate, fromMs } from "../utils/formatTime";
import { Play } from "react-ionicons";

interface Props {
  track: Track;
  no: number;
}
export function RenderTrack({ track, no }: Props) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audio.current) return;
    if (playing) {
      audio.current.pause();
      audio.current.currentTime = 0;
      setPlaying(false);
    } else {
      var previews = document.getElementsByTagName("audio");
      for (let i = 0; i < previews.length; i++) {
        previews[i].pause();
        previews[i].currentTime = 0;
      }
      audio.current.play();
      setPlaying(true);
    }
  };

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
        <a href={track.album.link}>
          <img
            width="100px"
            height="100px"
            src={track.album.cover}
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
                  <a href={x.link}>{x.name}</a>
                  <span style={{ marginRight: 4 }}>
                    {i !== track.artists.length - 1 ? "," : ""}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <a href={track.album.link} style={{ fontWeight: "bold" }}>
            {track.album.name} ({albumDate(track.album.release_date)})
          </a>

          <div style={{ marginTop: 4 }}>{fromMs(track.duration)}</div>
        </div>
      </div>

      {/* Link buton */}
      <div>
        <Play
          width="24px"
          height="24px"
          color="white"
          style={{ cursor: "pointer" }}
          onClick={() => {
            global.window.open(track.link, "_blank");
          }}
        />
      </div>
    </div>
  );
}
