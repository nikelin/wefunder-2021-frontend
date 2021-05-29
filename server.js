const express = require("express")
const webpack = require("webpack")
const path = require("path")
const webpackHotMiddleware = require("webpack-hot-middleware")
const webpackDevMiddleware = require("webpack-dev-middleware")

const app = express()
const config = require("./webpack.dev.js")
const compiler = webpack(config)

// Tell express to use the webpack-dev-middleware and use the webpack.common.js
// configuration file as a base.
app.use(
    webpackDevMiddleware(compiler, {})
).use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!\n")
})
