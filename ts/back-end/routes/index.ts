#!/usr/bin/env node


'use strict';


import { Application } from 'express';


const listPath = require('./list/post');


module.exports = function(app: Application, db: JSON) {
  listPath(app, db);
};

