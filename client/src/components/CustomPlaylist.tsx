import { useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { Button } from "./Button";
import {
  Add,
  MusicalNotesOutline,
  Options,
  Remove,
  Search,
  SettingsOutline,
} from "react-ionicons";
import { RenderTrack } from "./RenderTrack";
import { Modal } from "./Modal";
import { TextButton } from "./TextButton";
import { RenderTrackSimple } from "./RenderTrackSimple";

// todo
// -> make all genres into kebab case
// -> take only valid ones (included in array of valid genres)
// -> then send the request

interface Options {
  target_acousticness: number;
  target_danceability: number;
  target_energy: number;
  target_instrumentalness: number;
  target_liveness: number;
  target_speechiness: number;
  target_valence: number;
  target_tempo: number;
}
export function CustomPlaylist({ api }: { api: SpotifyWebApi }) {
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openSeed, setOpenSeed] = useState(false);
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectSimplified[]>([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [seedTracks, setSeedTracks] = useState<SpotifyApi.TrackObjectFull[]>(
    [],
  );
  const [isSearch, setIsSearch] = useState(false);
  const [options, setOptions] = useState<Options>({
    target_acousticness: 0.1,
    target_danceability: 0.1,
    target_energy: 0.3,
    target_instrumentalness: 0.75,
    target_liveness: 0.55,
    target_speechiness: 0.1,
    target_valence: 0.2,
    target_tempo: 140,
  });

  const doSearch = async () => {
    setSearching(true);
    try {
      console.log("search fn");
      const res = await api.searchTracks(search, { limit: 10 });
      setResults(res.body.tracks?.items || []);
    } catch (error) {
      global.window.alert(error);
    }
    setSearching(false);
  };

  const getTracks = async () => {
    setLoading(true);
    try {
      const ids = seedTracks.flatMap(x => x.artists.map(x => x.id));
      const artistsRes = await api.getArtists(ids);
      const seed_genres = artistsRes.body.artists.flatMap(x => x.genres);
      const res = await api.getRecommendations({
        limit: 100,
        seed_genres,
        seed_artists: ids,
        seed_tracks: seedTracks.map(x => x.id),
        ...options,
      });
      setTracks(res.body.tracks);
    } catch (error) {
      global.window.alert(error);
    }
    setLoading(false);
  };

  const _renderSearch = () => {
    return (
      <div>
        <div style={{ display: "flex", marginBottom: 16 }}>
          <form
            onSubmit={e => {
              e.preventDefault();
              doSearch();
            }}
            style={{ flex: 1, marginRight: 32 }}
          >
            <input
              type="text"
              placeholder="Search songs..."
              value={search}
              onChange={({ target: { value } }) => setSearch(value)}
              style={{
                padding: 8,
                width: "100%",
                fontSize: 20,
                border: "none",
                color: "white",
                outline: "none",
                background: "none",
                fontWeight: "bold",
                borderBottom: "4px solid white",
              }}
            />
          </form>
          <Button
            text="Go"
            onClick={doSearch}
            renderIcon={() => (
              <Search width="24px" height="24px" color="black" />
            )}
          />
        </div>
        <div>
          {results.map((t, i) => (
            <RenderTrack
              key={i}
              track={t}
              no={i + 1}
              renderButton={() => {
                if (seedTracks.some(x => x.id === t.id))
                  return (
                    <Remove
                      width="32px"
                      height="32px"
                      color="white"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setSeedTracks(seedTracks.filter(x => x.id !== t.id))
                      }
                    />
                  );
                return (
                  <Add
                    width="32px"
                    height="32px"
                    color="white"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSeedTracks([...seedTracks, t])}
                  />
                );
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const _renderSeed = () => {
    if (!seedTracks.length)
      return (
        <div>No seed tracks selected yet, add some by searching for them</div>
      );
    return (
      <div>
        {seedTracks.map((t, i) => (
          <RenderTrack
            key={i}
            track={t}
            no={i + 1}
            renderButton={() => {
              return (
                <Remove
                  width="24px"
                  height="24px"
                  color="white"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setSeedTracks(seedTracks.filter(x => x.id !== t.id))
                  }
                />
              );
            }}
          />
        ))}
      </div>
    );
  };

  const create = async () => {
    const name = global.window.prompt("Playlist name");
    if (!name) return;

    setLoading(true);
    try {
      const res = await api.createPlaylist(name, {
        description: "Playlist created by Asen's app",
      });
      await api.addTracksToPlaylist(
        res.body.id,
        tracks.map(x => x.uri),
      );
    } catch (error) {
      global.window.alert(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Custom Playlist</h1>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <div style={{ flex: 1 }} />
        <Button
          text="Seed"
          renderIcon={() => (
            <SettingsOutline width="24px" height="24px" color="black" />
          )}
          onClick={() => setOpenSeed(true)}
        />
        <div style={{ marginRight: 16 }} />
        <Button
          text="Settings"
          renderIcon={() => (
            <Options width="24px" height="24px" color="black" />
          )}
          onClick={() => setOpenSettings(true)}
        />
        <div style={{ marginRight: 16 }} />
        <Button
          text="Get Tracks"
          renderIcon={() => (
            <MusicalNotesOutline width="24px" height="24px" color="black" />
          )}
          onClick={() => getTracks()}
        />
        <div style={{ marginRight: 16 }} />
        <Button text="Make into playlist" onClick={create} />
      </div>
      <div>
        {!tracks.length ? (
          "Tracks will appear here"
        ) : (
          <div>
            {tracks.map((t, i) => (
              <RenderTrackSimple key={i} track={t} no={i + 1} />
            ))}
          </div>
        )}
      </div>

      {openSeed ? (
        <Modal onClose={() => setOpenSeed(false)}>
          <div
            style={{
              padding: 16,
              width: "100%",
              height: "100%",
              borderRadius: 16,
              overflowY: "auto",
              backgroundColor: "var(--color-2)",
            }}
          >
            <h1 style={{ margin: 0, marginBottom: 16 }}>Playlist seed</h1>
            <div style={{ display: "flex", marginBottom: 16 }}>
              <TextButton
                text="Seed tracks"
                selected={!isSearch}
                onClick={() => setIsSearch(false)}
              />
              <div style={{ marginRight: 16 }} />
              <TextButton
                text="Search tracks"
                selected={isSearch}
                onClick={() => setIsSearch(true)}
              />
            </div>

            {isSearch ? _renderSearch() : _renderSeed()}
          </div>
        </Modal>
      ) : null}

      {openSettings ? (
        <Modal onClose={() => setOpenSettings(false)}>
          <div
            style={{
              padding: 16,
              width: "100%",
              height: "100%",
              borderRadius: 16,
              overflowY: "auto",
              backgroundColor: "var(--color-2)",
            }}
          >
            <h1 style={{ margin: 0, marginBottom: 32 }}>Playlist settings</h1>
            <form onSubmit={e => e.preventDefault()}>
              <div style={{ display: "flex", marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  Target Tempo
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ marginRight: 16 }}>{options.target_tempo}</div>
                <input
                  type="range"
                  onChange={({ target: { value } }) =>
                    setOptions({ ...options, target_tempo: Number(value) })
                  }
                  min="80"
                  max="240"
                  step="1"
                  style={{ width: 200 }}
                  value={options.target_tempo}
                />
              </div>
              <hr style={{ marginBottom: 16 }} />

              <div style={{ display: "flex", marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  Target Acousticness
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ marginRight: 16 }}>
                  {options.target_acousticness}
                </div>
                <input
                  type="range"
                  onChange={({ target: { value } }) =>
                    setOptions({
                      ...options,
                      target_acousticness: Number(value),
                    })
                  }
                  min="0"
                  max="1"
                  step="0.05"
                  style={{ width: 200 }}
                  value={options.target_acousticness}
                />
              </div>
              <hr style={{ marginBottom: 16 }} />

              <div style={{ display: "flex", marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  Target Danceability
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ marginRight: 16 }}>
                  {options.target_danceability}
                </div>
                <input
                  type="range"
                  onChange={({ target: { value } }) =>
                    setOptions({
                      ...options,
                      target_danceability: Number(value),
                    })
                  }
                  min="0"
                  max="1"
                  step="0.05"
                  style={{ width: 200 }}
                  value={options.target_danceability}
                />
              </div>
              <hr style={{ marginBottom: 16 }} />

              <div style={{ display: "flex", marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  Target Energy
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ marginRight: 16 }}>{options.target_energy}</div>
                <input
                  type="range"
                  onChange={({ target: { value } }) =>
                    setOptions({
                      ...options,
                      target_energy: Number(value),
                    })
                  }
                  min="0"
                  max="1"
                  step="0.05"
                  style={{ width: 200 }}
                  value={options.target_energy}
                />
              </div>
              <hr style={{ marginBottom: 16 }} />

              <div style={{ display: "flex", marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  Target Instrumentalness
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ marginRight: 16 }}>
                  {options.target_instrumentalness}
                </div>
                <input
                  type="range"
                  onChange={({ target: { value } }) =>
                    setOptions({
                      ...options,
                      target_instrumentalness: Number(value),
                    })
                  }
                  min="0"
                  max="1"
                  step="0.05"
                  style={{ width: 200 }}
                  value={options.target_instrumentalness}
                />
              </div>
              <hr style={{ marginBottom: 16 }} />

              <div style={{ display: "flex", marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  Target Liveness
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ marginRight: 16 }}>{options.target_liveness}</div>
                <input
                  type="range"
                  onChange={({ target: { value } }) =>
                    setOptions({
                      ...options,
                      target_liveness: Number(value),
                    })
                  }
                  min="0"
                  max="1"
                  step="0.05"
                  style={{ width: 200 }}
                  value={options.target_liveness}
                />
              </div>
              <hr style={{ marginBottom: 16 }} />

              <div style={{ display: "flex", marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  Target Speechiness
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ marginRight: 16 }}>
                  {options.target_speechiness}
                </div>
                <input
                  type="range"
                  onChange={({ target: { value } }) =>
                    setOptions({
                      ...options,
                      target_speechiness: Number(value),
                    })
                  }
                  min="0"
                  max="1"
                  step="0.05"
                  style={{ width: 200 }}
                  value={options.target_speechiness}
                />
              </div>
              <hr style={{ marginBottom: 16 }} />

              <div style={{ display: "flex", marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  Target Valence
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ marginRight: 16 }}>{options.target_valence}</div>
                <input
                  type="range"
                  onChange={({ target: { value } }) =>
                    setOptions({
                      ...options,
                      target_valence: Number(value),
                    })
                  }
                  min="0"
                  max="1"
                  step="0.05"
                  style={{ width: 200 }}
                  value={options.target_valence}
                />
              </div>
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
