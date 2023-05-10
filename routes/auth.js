const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} = require("simple-oauth2");

const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();

var ion_client_id = "1fQW663tpWj59Bbyo6lNY3HwonYeMYk1d4cGQFup";
var ion_client_secret =
  "zYLbN0qHpqyOktnjhLtsgF7KJvxnsDqxLkm3Hno0DkA0eSG2j1ajaJCW3jaAooQWwgQ5gdBA9USdbvvEETkTx7HCM3w1njIL1EAejzkXwgvm9sZ6PHp5dUbCE5ir5mKq";
var ion_redirect_uri = "http://localhost:3000/auth";

router.get("/login", (req, res, next) => {
  var oauth = new AuthorizationCode({
    client: {
      id: ion_client_id,
      secret: ion_client_secret,
    },
    auth: {
      tokenHost: "https://ion.tjhsst.edu/oauth/",
      authorizePath: "https://ion.tjhsst.edu/oauth/authorize",
      tokenPath: "https://ion.tjhsst.edu/oauth/token/",
    },
  });

  // 1) when the user visits the site, redirect them to login_url to begin authentication
  var authorizationUri = oauth.authorizeURL({
    scope: "read", // remove scope: read if you also want write access
    redirect_uri: ion_redirect_uri,
  });

  res.json({ url: authorizationUri });
});

router.post("/data", async (req, res, next) => {
  var code = req.body.code;

  var oauth = new AuthorizationCode({
    client: {
      id: ion_client_id,
      secret: ion_client_secret,
    },
    auth: {
      tokenHost: "https://ion.tjhsst.edu/oauth/",
      authorizePath: "https://ion.tjhsst.edu/oauth/authorize",
      tokenPath: "https://ion.tjhsst.edu/oauth/token/",
    },
  });

  try {
    const accessToken = await oauth.getToken({
      code: code,
      redirect_uri: ion_redirect_uri,
      scope: "read",
    });
    console.log(accessToken);
    const url =
      "https://ion.tjhsst.edu/api/profile?format=json&access_token=" +
      accessToken.token.access_token;
    console.log(url);
    const responseData = await fetch(url, { method: "GET" });
    const data = await responseData.json();
    res.json({ data });
  } catch (error) {
    return next(new HttpError("Access Token Error", 500));
  }
});

module.exports = router;
