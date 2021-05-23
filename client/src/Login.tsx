import logo from "./logo.png";

// url stuff
const redirectUri = "https://spotify-coolness.surge.sh/";
const clientId = "6c68970138484af086dba84c7c147503";
const scopes = [
  "streaming",
  "user-top-read",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-recently-played",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "user-library-modify",
].join("%20");
const base = "https://accounts.spotify.com/authorize";

// auth url
const AUTH_URL = `${base}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;

export default function Login() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: 16,
          borderRadius: 4,
          cursor: "pointer",
          backgroundColor: "var(--color-2)",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => {
          window.location.assign(AUTH_URL);
        }}
      >
        <span style={{ marginRight: 16, fontWeight: "bold" }}>
          Login with Spotify
        </span>
        <img src={logo} width="36px" height="36px" />
      </div>
    </div>
  );
}
