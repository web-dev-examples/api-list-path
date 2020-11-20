#!/usr/bin/env node


'use strict';


import * as path from 'path';
import * as fs from 'fs';


import { Application } from 'express';

import {
  DataBase_Configuration__Routes,
  FS_Stat__Results
} from '../../interfaces';


module.exports = function(app: Application, db: DataBase_Configuration__Routes) {
  /**
   * Process POST requests to '/list' path
   * @see {link} https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback
   * @see {link} https://nodejs.org/api/fs.html#fs_class_fs_stats
   * @see {link} https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback
   * @see {link} https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
   */
  app.post('/list', (request, response) => {
    const posted_path = request.body['path'];
    console.log('posted_path ->', posted_path);
    console.log('request.body ->', request.body);

    // Check input
    if (posted_path === undefined || !posted_path.length) {
      response.status(405).send('Method Not Allowed\n');
      const error = new Error('posted_path variable could not be parsed from request');
      console.error('Error:', error.message);
      return error;
    }

    // Check configurations
    if (!db['base_directory']) {
      response.status(500).send('Internal Server Error');
      const error = new Error('application missing "base_directory" db configuation');
      console.error(error);
      return error;
    }

    // Sanitize input
    const sanitized_path: string = `${posted_path}`.split(
      new RegExp(`^(${path.sep}|.${path.sep}|..${path.sep})*`)
    ).slice(-1)[0].replace(
      new RegExp('[^a-z0-9A-Z +_./@:-]*'), ''
    );
    console.log('sanitized_path ->', sanitized_path);

    const absolute_path = path.join(db['base_directory'], sanitized_path);
    console.log('absolute_path ->', absolute_path);

    // Process request
    fs.stat(absolute_path, (error: Error, stats: fs.Stats) => {
      if (error) {
        response.status(404).send('Not Found\n');
        console.error(error);
        return error;
      }

      const results: FS_Stat__Results = {};
      if (stats.isDirectory()) {
        return fs.readdir(absolute_path, (error: Error, files: string[]): (FS_Stat__Results | Error) => {
          if (error) {
            response.status(500).send('Internal Server Error\n');
            console.error(error);
            return error;
          }

          results[`${absolute_path}`] = {
            files: files,
            stats: stats,
            is_directory: true,
          };
          response.status(200).send(JSON.stringify(results));
          return results;
        });
      } else if (stats.isFile()) {
          results[`${absolute_path}`] = {
            stats: stats,
            is_file: true,
          };
          response.status(200).send(JSON.stringify(results));
          return results;
      }
    });
  });
};

