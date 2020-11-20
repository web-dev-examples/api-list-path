#!/usr/bin/env node


'use strict';


import { Request, Response, NextFunction } from "express";


const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const path = require('path');


const configure = require('./configure.json');
const routes = require('./routes/index');


const app = express();


/**
 * Set defaults for undefined configurations
 */
if (!configure['routes']) {
  configure['routes'] = {};
}

if (!configure['service']) {
  configure['service'] = {};
}

/**
 * @see {link} https://nodejs.org/docs/latest/api/modules.html#modules_dirname
 */
if (!configure['routes']['base_directory']) {
  configure['routes']['base_directory'] = __dirname;
}

if (!configure['service']['listen_port']) {
  configure['service']['listen_port'] = 8080;
}


app.use(bodyParser.urlencoded({ extended: true }));


/**
 * @see {link} https://expressjs.com/en/starter/static-files.html
 */
const static_path: string = path.join(__dirname.split(path.sep).slice(0, -1).join(path.sep), 'static');
app.use('/', express.static(static_path));


/**
 * @see {link} https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
 */
if (configure['service']['environment'] !== undefined && configure['service']['environment'].startsWith('dev')) {
  app.use((request: Request, response: Response, next: NextFunction) => {
    response.header('Access-Control-Allow-Origin', '*');
    next();
  });
}


app.listen(configure['service']['listen_port'], () => {
  console.log('Listening on port ->', configure['service']['listen_port']);
});

routes(app, configure['routes']);

