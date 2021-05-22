import SpotifyWebApi from "spotify-web-api-node";

export const useApi = () => {
  return new SpotifyWebApi({
    clientId: "8b945ef10ea24755b83ac50cede405a0",
    clientSecret: "524fc97a2763460598a3420b7253ee81",
    redirectUri: "http://localhost:3000",
  });
};
