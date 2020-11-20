#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const listPath = require('./list/post');
module.exports = function (app, db) {
    listPath(app, db);
};
