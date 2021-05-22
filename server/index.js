require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const api = new SpotifyWebApi({
    clientId: "6c68970138484af086dba84c7c147503",
    clientSecret: "524fc97a2763460598a3420b7253ee81",
    redirectUri: "http://localhost:3000",
    refreshToken,
  });
  api
    .refreshAccessToken()
    .then(data =>
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      }),
    )
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const api = new SpotifyWebApi({
    clientId: "6c68970138484af086dba84c7c147503",
    clientSecret: "524fc97a2763460598a3420b7253ee81",
    redirectUri: "http://localhost:3000",
  });
  api
    .authorizationCodeGrant(code)
    .then(data =>
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
        refreshToken: data.body.refresh_token,
      }),
    )
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.listen(3001, () => console.log("started"));
