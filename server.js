const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
var cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
// proxy middleware options
const options = {
  target: "http://34.136.13.142:8000", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    "^/api/old-path": "/api/new-path", // rewrite path
    "^/api/remove/path": "/path", // remove base path
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    "dev.localhost:3000": "http://localhost:8000",
  },
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
app.use("/", exampleProxy);
app.listen(3000);
