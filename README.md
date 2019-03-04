ratpack-react-boilerplate
=====================

[![Build Status](https://dev.azure.com/gschrader/gschrader/_apis/build/status/gschrader.ratpack-react-boilerplate?branchName=master)](https://dev.azure.com/gschrader/gschrader/_build/latest?definitionId=1&branchName=master)
[![dependencies Status](https://david-dm.org/gschrader/ratpack-react-boilerplate/status.svg)](https://david-dm.org/gschrader/ratpack-react-boilerplate)
[![License](https://img.shields.io/github/license/gschrader/ratpack-react-boilerplate.svg)](https://raw.githubusercontent.com/gschrader/ratpack-react-boilerplate/master/LICENSE)

An example single page app with the server using Ratpack and the frontend using React. In a development environment the React components can be live edited so that a browser refresh isn't requierd.

It uses [create-react-app](https://github.com/facebookincubator/create-react-app) because who can keep up with all the build configuration required to build javascript these days.

It handles authentication via the Ratpack Pac4j module using JSON Web Tokens (JWT). It has example of using websockets to transfer data from the JVM to the frontend. `AuthenticatorService` performs the authentication, use the same username/password to login.

### Usage

* `./gradlew npm_install` or `npm install` from the `react` directory
* `./gradlew npm_build` or `npm build` from the `react` directory
* `./gradlew npm_start` or `npm start` from the `react` directory
* `./gradlew run`
* the browser will open using port 3000

Now edit files under `react/src`.
Your changes will appear without reloading the browser like this:

![Demo](./demo.gif)

New node dependencies can be added to `react/package.json`.

The node server (port 3000) proxies api requests to the Ratpack server.
The Ratpack server (port 5050) will serve up the production optimized built javascript/css assets.

### Node Libraries
 * [React](https://github.com/facebook/react)
 * [Redux](https://github.com/reactjs/redux)
 * [React Bootstrap](Https://github.com/react-bootstrap/react-bootstrap)
 * [React Router](https://github.com/reactjs/react-router)
 * [Others](https://david-dm.org/gschrader/ratpack-react-boilerplate?path=react)

### File Structure ###

```
.
├── build.gradle
├── ratpack
│   ├── build.gradle                  # gradle file for building server
│   └── src
│       ├── main
│       │   ├── groovy                # java source
│       │   └── resources             
│       └── ratpack
│           ├── Ratpack.groovy        # server handling
│           └── templates
│               └── index.html -> ../../../../react/build/index.html
│                                     # sym-linked, built from node
├── react
│   ├── build.gradle                  # gradle file which builds the js/css
│   ├── index.html                    # index file template
│   ├── package.json                  # add additional node libraries as needed
│   └── src                           # react/redux javascript code
└── settings.gradle                   # for multi-project build

```

### Windows ###
The `/ratpack/src/ratpack/template/index.html` should be sym-linked to `/react/build/index.html`. In order to do that you can use PowerShell to create the link with the following command:

`
New-Item -ItemType SymbolicLink -Target react\build\index.html -Path ratpack\src\ratpack\templates\index.html
`
