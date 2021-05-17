require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

app.post("/refresh", (req,res) => {
    const refreshToken = req.body.refreshToken;
    const api = new SpotifyWebApi({
        clientId,
        clientSecret,
        redirectUri,
        refreshToken
    });
    api.refreshAccessToken().then(data => res.json({
        accessToken:data.body.access_token,
        expiresIn:data.body.expires_in
    })).catch(_ => res.send(400));
});

app.post("/login", (req, res) => {
    const code = req.body.code;
    const api = new SpotifyWebApi({clientId,clientSecret,redirectUri});
    api.authorizationCodeGrant(code).then(data => res.json({
        accessToken:data.body.access_token,
        expiresIn:data.body.expires_in,
        refreshToken: data.body.refresh_token,
    })).catch(_ => res.send(400));
});