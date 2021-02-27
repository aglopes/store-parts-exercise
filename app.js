const express = require("express");
const api_routes = require("./routes/parts");
const app_routes = require("./routes/app");
const app = express();
const path = require('path');

app.use("/store", api_routes);
//lets just becarefull under app for not throw a folder named store
app.use("/", app_routes); //will throw index for each route
app.use("/", express.static("app")); //for index.html able to load scripts and styles
app.use('/vue', express.static(path.join(__dirname, 'node_modules/vue/dist')));
app.use('/vue-router', express.static(path.join(__dirname, 'node_modules/vue-router/dist')));


module.exports = app;
