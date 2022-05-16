<h1 align="center">Welcome to TIM 3D 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.3-blue.svg?cacheSeconds=2592000" />
  <a href="https://mattjoke.github.io/TIM3D/docs/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/mattjoke/TIM3D/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/mattjoke/TIM3D/blob/main/LICENSE" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/github/license/mattjoke/TIM3D" />
  </a>
</p>

TIM 3D is a Three.js based interactive manual builder. It loads 3D files and builds a manual out of them.

## Links

- ### 🕸️ [Webpage](https://mattjoke.github.io/TIM3D/)
- ### 📃 [Docs](https://mattjoke.github.io/TIM3D/docs)
- ### ✅ [Releases](https://github.com/mattjoke/TIM3D/releases/latest)
- ### 💻 [NPM](https://www.npmjs.com/package/tim3d)

## Installation

```sh
npm install tim3d
```

## Usage

This example shows a basic manual. A more interactive and comprehensive manual can be found on the [webpage](https://mattjoke.github.io/TIM3D/#/introduction).

First, initialise the instance with the config object. The definitions of what can be set are available on the [docs website](https://mattjoke.github.io/TIM3D/docs/interfaces/Config.html).

```javascript
import { Factory } from 'tim3d';

const div = document.getElementById('container');
const config = {
  container: div,
  colors: {
    backgroundColor: '#123456'
  }
};
const manual = new Factory(config);
```

Next, create an object with files and step definitions. With these, then create an instance using **loadJSON** method.

```javascript
const json = {
  files: [
    {
      id: 'cube_id',
      file: './path/to/cube.obj'
    }
    // Other files
  ],
  steps: [
    {
      name: 'First Step',
      positions: [
        {
          id: 'cube_id',
          pose: {
            position: [10, 0, 0]
          }
        }
      ]
    }
    // Other steps
  ]
};
// Load the uploaded object with file and step definitions
manual.loadJSON(json);
```

More precise definition of the _json_ object with more in-depth fields can be found on the [docs website](https://mattjoke.github.io/TIM3D/docs/interfaces/JSON.html).

## Scripts

Build a non-production version of the library

```SH
npm run build
```

Build a production version of the library

```SH
npm run build:prod
```

Starts a Webpack live sever, automatically builds the library and exposes it to `localhost`

```sh
npm run dev
```

Performs an ESLint check

```sh
npm run lint:check
```

Tries to fix solvable ESLint errors

```sh
npm run lint:fix
```

Scans all files and checks if they are corresponding to the Prettier config

```sh
npm run prettier:check
```

Scans all files and updates them with the correct Prettier config

```sh
npm run prettier:write
```

Generates documentation from the whole library

```sh
npm run docs:gen
```

## Author

👤 **Matej Hakoš**

- Github: [@mattjoke](https://github.com/mattjoke)
- Twitter: [@matt_joke1](https://twitter.com/matt_joke1)
- LinkedIn: [Matej Hakoš](https://www.linkedin.com/in/matej-hakos/)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Matej Hakoš](https://github.com/mattjoke).<br />
This project is [Apache--2.0](./LICENSE.md) licensed.
