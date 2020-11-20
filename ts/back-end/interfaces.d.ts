#!/usr/bin/env node


import * as fs from 'fs';


export interface DataBase_Configuration__Routes {
  base_directory: string,
}


export interface DataBase_Configuration__Service {
  listen_port: number,
}


export interface DataBase_Configuration {
  routes: DataBase_Configuration__Routes,
  service: DataBase_Configuration__Service,
}


export interface FS_Stat__Results {
  [key: string]: {
    stats: fs.Stats,
    files?: string[],
    is_directory?: boolean,
    is_file?: boolean,
  },
}

