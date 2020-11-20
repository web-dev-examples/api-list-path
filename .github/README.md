# Api List Path
[heading__top]:
  #api-list-path
  "&#x2B06; ExpressJS example server and client API"


ExpressJS example server and client API


## [![Byte size of Api List Path][badge__main__api_list_path__source_code]][api_list_path__main__source_code] [![Open Issues][badge__issues__api_list_path]][issues__api_list_path] [![Open Pull Requests][badge__pull_requests__api_list_path]][pull_requests__api_list_path] [![Latest commits][badge__commits__api_list_path__main]][commits__api_list_path__main]


---


- [:arrow_up: Top of Document][heading__top]

- [:building_construction: Requirements][heading__requirements]

- [:zap: Quick Start][heading__quick_start]

- [&#x1F9F0; Usage][heading__usage]

- [&#x1F5D2; Setup Notes][heading__setup_notes]

  - [Initialize Version Management][heading__initialize_version_management]
  - [Development Dependencies][heading__development_dependencies]
  - [App Dependencies][heading__app_dependencies]
  - [Directory/File Structure][heading__directoryfile_structure]
  - [:small_airplane: Overview][heading__overview]

- [:chart_with_upwards_trend: Contributing][heading__contributing]

  - [:trident: Forking][heading__forking]
  - [:currency_exchange: Sponsor][heading__sponsor]

- [:card_index: Attribution][heading__attribution]

- [:balance_scale: Licensing][heading__license]


---



## Requirements
[heading__requirements]:
  #requirements
  "&#x1F3D7; Prerequisites and/or dependencies that this project needs to function properly"


NodeJS and NPM are utilized by this project to track and install dependencies, check the official [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) guide for details.


______


## Quick Start
[heading__quick_start]:
  #quick-start
  "&#9889; Perhaps as easy as one, 2.0,..."


**Clone Project**


```Bash
mkdir -vp ~/git/hub/web-dev-examples

cd ~/git/hub/web-dev-examples

git clone git@github.com:web-dev-examples/api-list-path.git
```


---


**Install All Dependencies** (option 1)


```Bash
npm install
```


**Install Development Dependencies** (option 2)


```Bash
npm install --only=dev
```


**Install Production Dependencies** (option 3)


```Bash
npm install --production
```


---


**Run ExpressJS Server**


```Bash
npm run start
```


Navigate to `http://localhost:8080/` within a web-browser to interact with API via UI, or send Curl commands similar to...


```Bash
curl --data 'path=.' --url 'http://localhost:8080/list'
```


______


## Usage
[heading__usage]:
  #usage
  "&#x1F9F0; How to utilize this repository"


After editing files under `ts/` directory transpile JavaScript via...


```Bash
npm run ts-build
```


______


## Setup Notes
[heading__setup_notes]:
  #setup-notes
  "&#x1F5D2; Steps preformed to construct this project"


> Steps preformed to construct this project


---


### Initialize Version Management
[heading__initialize_version_management]:
  #initialize-version-management
  ""


```Bash
git init api-list-path

cd api-list-path
```


---


### Development Dependencies
[heading__development_dependencies]:
  #development-dependencies
  ""


```Bash
npm install --save-dev @types/express\
                       @types/node\
                       nodemon\
                       typescript
```


---


### App Dependencies
[heading__app_dependencies]:
  #app-dependencies
  ""


```Bash
npm install --save body-parser express
```


---


### Directory/File Structure
[heading__directoryfile_structure]:
  #directoryfile-structure
  ""


```Bash
touch .gitignore


touch tsconfig.json
touch tsconfig.back-end.json
touch tsconfig.front-end.json


mkdir -p ts/back-end/routes/list
touch ts/back-end/index.ts
touch ts/back-end/routes/index.ts
touch ts/back-end/routes/list/post.ts


mkdir -p front-end/assets/js
touch front-end/index.html


mkdir -p ts/front-end/assets/js
touch ts/front-end/assets/js/index.ts
```


---


### Overview
[heading__overview]:
  #overview
  "&#x1f6e9; Brief descriptions about directory/file structure"


- [`package.json`][file__package_json] NPM configurations


> Check the `"script"` key for available `npm run <target>` options


------


- [`.gitignore`][file__gitignore] configures directory/file patterns that Git should ignore from version control by default.


> Ignored directories and/or files can be added via `-f` or `--force` option, eg...


```Bash
git add -f ignored-file.ext
```


------


- [`tsconfig.json`][file__tsconfig_json] contains shared TypeScript transpiling configurations.

- [`tsconfig.back-end.json`][file__tsconfig_back_end_json] back-end specific TypeScript transpiling configurations.

- [`tsconfig.front-end.json`][file__tsconfig_front_end_json] front-end specific TypeScript transpiling configurations.

- [`tsconfig.jest.json`][file__tsconfig_jest_json] Jest test specific TypeScript transpiling configurations.


> Multi-configuration setups with TypeScript can be a bit tricky; the main [`tsconfig.json`][file__tsconfig_json] should contain configurations shared by all projects, and any project specific files should then overwrite and/or add further customization.


[**`tsconfig.back-end.json`**][file__tsconfig_back_end_json]


```JSON
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "back-end",
    "lib": [ "es2017" ],
    "esModuleInterop": true,
    "moduleResolution": "node",
    "module": "commonjs"
  },
  "include": [
    "ts/back-end/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "ts/front-end",
    "ts/jest"
  ]
}
```


> The `"outDir"` key defines where transpiled JavaScript files will be saved
>
> The `"include"` key defines a list of directory/file paths that will be transpiled by current configurations
>
> The `"exclude"` key defines a list of directory/file paths that should **not** be transpiled by current configurations


[**`package.json` (snip)**][file__package_json]


```JSON
{
  /* ... */
  "scripts": {
    "nodemon": "nodemon back-end/index.js",
    "start": "node back-end/index.js",
    "ts-build-back-end": "tsc --project tsconfig.back-end.json",
    "ts-watch-back-end": "tsc --project tsconfig.back-end.json ts/back-end --watch",
  },
  /* ... */
}
```


> The `--project` parameter of `tsc` commands defines a configuration file to be used for transpiling


------


- [`ts/back-end/`][directory__ts__backend] directory contains TypeScript source files for back-end server

- [`ts/back-end/index.ts`][file__ts__back_end__index_ts] initializes ExpressJS server, with configurations, and imports route callbacks
- [`ts/back-end/routes/index.ts`][file__ts__back_end__routes__index_ts] imports, and names, route callback functions
- [`ts/back-end/routes/list/post.ts`][file__ts__back_end__routes__list__post_ts] defines callback function for `<hostname>/list` route HTTP POST requests


> For a small applications this level of organization may be excessive, however, for larger projects splitting responsibilities into separate directories and/or files can be helpful.
>
> TypeScript files for back-end server may be transpiled via `npm run` script targets...


```Bash
npm run ts-build-back-end
```


> ... which will output transpiled JavaScript files to the [`back-end`][directory__backend] directory


------


- [`front-end/index.html`][file__front-end__index_html] served to web-browsers issuing HTTP GET requests at `<hostname>/index.html`, or `<hostname>/`

- [`ts/front-end/assets/js/`][directory__ts__front_end__assets__js] directory contains JavaScript files for web-browsers to execute
- [`ts/front-end/assets/js/index.ts`][file__ts__front-end__assets__js__index_ts] defines how web-browsers should interact with back-end via HTTP POST requests, as well as how repose data should be displayed.


> Currently the front-end code for web-browsers is not pretty, but is functional.


______


## Contributing
[heading__contributing]:
  #contributing
  "&#x1F4C8; Options for contributing to api-list-path and web-dev-examples"


Options for contributing to api-list-path and web-dev-examples


---


### Forking
[heading__forking]:
  #forking
  "&#x1F531; Tips for forking api-list-path"


Start making a [Fork][api_list_path__fork_it] of this repository to an account that you have write permissions for.


- Add remote for fork URL. The URL syntax is _`git@github.com:<NAME>/<REPO>.git`_...


```Bash
cd ~/git/hub/web-dev-examples/api-list-path

git remote add fork git@github.com:<NAME>/api-list-path.git
```


- Commit your changes and push to your fork, eg. to fix an issue...


```Bash
cd ~/git/hub/web-dev-examples/api-list-path


git commit -F- <<'EOF'
:bug: Fixes #42 Issue


**Edits**


- `<SCRIPT-NAME>` script, fixes some bug reported in issue
EOF


git push fork main
```


> Note, the `-u` option may be used to set `fork` as the default remote, eg. _`git push -u fork main`_ however, this will also default the `fork` remote for pulling from too! Meaning that pulling updates from `origin` must be done explicitly, eg. _`git pull origin main`_


- Then on GitHub submit a Pull Request through the Web-UI, the URL syntax is _`https://github.com/<NAME>/<REPO>/pull/new/<BRANCH>`_


> Note; to decrease the chances of your Pull Request needing modifications before being accepted, please check the [dot-github](https://github.com/web-dev-examples/.github) repository for detailed contributing guidelines.


---


### Sponsor
  [heading__sponsor]:
  #sponsor
  "&#x1F4B1; Methods for financially supporting web-dev-examples that maintains api-list-path"


Thanks for even considering it!


Via Liberapay you may <sub>[![sponsor__shields_io__liberapay]][sponsor__link__liberapay]</sub> on a repeating basis.


Regardless of if you're able to financially support projects such as api-list-path that web-dev-examples maintains, please consider sharing projects that are useful with others, because one of the goals of maintaining Open Source repositories is to provide value to the community.


______


## Attribution
[heading__attribution]:
  #attribution
  "&#x1F4C7; Resources that where helpful in building this project so far."


- [Dev IO -- Developing an express application using TypeScript](https://dev.to/aligoren/developing-an-express-application-using-typescript-3b1)

- [ExpressJS -- Serving static files in Express](https://expressjs.com/en/starter/static-files.html)

- [Free Code Camp -- BUilding a simpple NodeJS API in under 30 minuets](https://www.freecodecamp.org/news/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2/)

- [GitHub -- `github-utilities/make-readme`](https://github.com/github-utilities/make-readme)

- [MDN -- Element `getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)

- [MDN -- How to use `data` attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)

- [MDN -- JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

- [MDN -- Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)

- [Medium -- 3 Ways to fix the CORS error and how access control allow origin works](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9)

- [NodeJS -- `__dirname`](https://nodejs.org/docs/latest/api/modules.html#modules_dirname)

- [NodeJS -- `fs.readdir`](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)

- [NodeJS -- `fs.stat`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback)

- [NodeJS -- `fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats)

- [StackOverflow -- How to add TypeScript definitions to express req res](https://stackoverflow.com/questions/34508081/)

- [StackOverflow -- How to use multiple tsconfig files in vs code](https://stackoverflow.com/questions/37579969/)

- [StackOverflow -- NPM install wont install devDependencies](https://stackoverflow.com/questions/34700610/)

- [StackOverflow -- POST data with Request module on Node JS](https://stackoverflow.com/questions/6432693/)

- [Wikipedia -- List of HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)


______


## License
[heading__license]:
  #license
  "&#x2696; Legal side of Open Source"


```
ExpressJS example server and client API
Copyright (C) 2020 S0AndS0

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```


For further details review full length version of [AGPL-3.0][branch__current__license] License.



[branch__current__license]:
  /LICENSE
  "&#x2696; Full length version of AGPL-3.0 License"


[badge__commits__api_list_path__main]:
  https://img.shields.io/github/last-commit/web-dev-examples/api-list-path/main.svg

[commits__api_list_path__main]:
  https://github.com/web-dev-examples/api-list-path/commits/main
  "&#x1F4DD; History of changes on this branch"


[api_list_path__community]:
  https://github.com/web-dev-examples/api-list-path/community
  "&#x1F331; Dedicated to functioning code"


[issues__api_list_path]:
  https://github.com/web-dev-examples/api-list-path/issues
  "&#x2622; Search for and _bump_ existing issues or open new issues for project maintainer to address."

[api_list_path__fork_it]:
  https://github.com/web-dev-examples/api-list-path/
  "&#x1F531; Fork it!"

[pull_requests__api_list_path]:
  https://github.com/web-dev-examples/api-list-path/pulls
  "&#x1F3D7; Pull Request friendly, though please check the Community guidelines"

[api_list_path__main__source_code]:
  https://github.com/web-dev-examples/api-list-path/
  "&#x2328; Project source!"

[badge__issues__api_list_path]:
  https://img.shields.io/github/issues/web-dev-examples/api-list-path.svg

[badge__pull_requests__api_list_path]:
  https://img.shields.io/github/issues-pr/web-dev-examples/api-list-path.svg

[badge__main__api_list_path__source_code]:
  https://img.shields.io/github/repo-size/web-dev-examples/api-list-path


[file__package_json]:
  https://github.com/web-dev-examples/api-list-path/blob/main/package.json

[file__gitignore]:
  https://github.com/web-dev-examples/api-list-path/blob/main/.github

[file__tsconfig_json]:
  https://github.com/web-dev-examples/api-list-path/blob/main/tsconfig.back-end.json

[file__tsconfig_back_end_json]:
  https://github.com/web-dev-examples/api-list-path/blob/main/tsconfig.back-end.json

[file__tsconfig_front_end_json]:
  https://github.com/web-dev-examples/api-list-path/blob/main/tsconfig.front-end.json

[file__tsconfig_jest_json]:
  https://github.com/web-dev-examples/api-list-path/blob/main/tsconfig.jest.json

[file__jest_back_end_json]:
  https://github.com/web-dev-examples/api-list-path/blob/main/jest.back-end.json

[file__jest_front_end_json]:
  https://github.com/web-dev-examples/api-list-path/blob/main/jest.front-end.json


[directory__backend]:
  https://github.com/web-dev-examplesapi-list-path/tree/main/back-end

[directory__ts__backend]:
  https://github.com/web-dev-examplesapi-list-path/tree/main/ts/back-end

[file__ts__back_end__index_ts]:
  https://github.com/web-dev-examples/api-list-path/blob/main/ts/back-end/index.ts

[file__ts__back_end__routes__index_ts]:
  https://github.com/web-dev-examples/api-list-path/blob/main/ts/back-end/routes/index.ts

[file__ts__back_end__routes__list__post_ts]:
  https://github.com/web-dev-examples/api-list-path/blob/main/ts/back-end/routes/list/post.ts


[directory__ts__jest]:
  https://github.com/web-dev-examplesapi-list-path/tree/main/ts/jest

[file__ts__jest__back_end__index_ts]:
  https://github.com/web-dev-examples/api-list-path/blob/main/ts/jest/back-end/index.ts

[file__ts__jest__front_end__index_ts]:
  https://github.com/web-dev-examples/api-list-path/blob/main/ts/jest/front-end/index.ts


[directory__front_end]:
  https://github.com/web-dev-examplesapi-list-path/tree/main/front-end

[file__front-end__index_html]:
  https://github.com/web-dev-examples/api-list-path/blob/main/front-end/index.html


[directory__ts__front_end__assets__js]:
  https://github.com/web-dev-examplesapi-list-path/tree/main/ts/front-end/assets/js

[file__ts__front-end__assets__js__index_ts]:
  https://github.com/web-dev-examples/api-list-path/blob/main/ts/front-end/assets/js/index.ts

