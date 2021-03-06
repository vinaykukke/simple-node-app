# Test app using node

## Getting started

This app does not come with any included `node_modules` or `compiled js`

To get setup all you need to do is run

```bash
yarn && yarn start
```
OR
```bash
npm i && npm run start
```
Depending on your preference, my preference is `yarn`

## Project organazation

This project is 2 main parts
  * `dist`: This is where all the compiled code lives. This will be generated by `webpack`
  * `src`: This is where the source code lives.

The `src` dir is split into
  * `build`: This is where all the webpack configuration lives
  * `client`: This is where all the client side code lives
  * `data`: This is where the `host-app-data.json` will be served from when a request for this file is made
  * `server`: This is where all the server code lives
  * `views`: This is where the html template lives

The `client` dir is divided into
  * `components`: The logic is to put all the reusable pieces of UI code here.
  * `helpers`: This is where all the helpers for the project live. I believe that these are functions that provide help by modifying the data provided to them in a specific way and returning them back, in a sense providing `help` to the person calling them. For example all the methods `getAppsByHost`, `addAppToHosts`, `removeAppFromHosts` live here. This probably could've done in another way, but i prefer to think of them as helper functions.
  * `styles`: Simple CSS file with all styles
  * `types`: Place for all the types for the project

# Build

This project uses the webpack Node API to create bundles. When developing, the `yarn dev` command will run only one script:

* `webpack.js` uses `webpack.config.js`

This in return produces a `client.bundle.js` file in the `dist` folder

## Uglify

Currently, `uglify-webpack-plugin` uses the `uglify-js` engine which does not support minification of code above ES5. The beta version uses a different minification engine, `uglify-es` which has better support for new language features.

During minification, a minifier supporting dead code elimination will reduce all of this `doSomething()` to something similar to

```js
d() // renamed doSomething()
```
# TypeScript

TypeScript is a strict syntactical superset of JavaScript, and adds optional static typing to the language. The entire clients side of the project is build on TypeScript

## Matching Webpack's aliases to TypeScript's

Webpack and TypeScript's module resolution have been manually matched to ensure that aliases resolve to the same modules with both tools.

TypeScript is set to produce `"ESNext"` modules. `"ESNext"` allows for dynamic or lazy importing. This does not mean that it leaves any `import` statements untouched: it will perform module resolution on import statements, and fully resolves the import path in the generated code. Here is an example from the [typesctipt website](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html)

```ts
async function getZipFile(name: string, files: File[]): Promise<File> {
  const zipUtil = await import('./utils/create-zip-file');
  const zipContents = await zipUtil.getContentAsBlob(files);
  return new File(zipContents, name);
}
```

For the resolution to succeed, a valid file must eventually be found. webpack then reads the resolved paths, and should resolve to the same module.

# Code
There are 3 ways of writing/ implementing the `index` file where the fetch is made
 * The regular way of just using `fetch` on the client that is shown in `index.ts`
 * The `async` way, that is using `async ... await` that is shown in `index.async.ts`
 * The `generator` way, that is using `generators` that is shown in `index.generator.ts`

# Big O

I think that the total Complexity of the algorithm is `O(n^2) + O(n^2) + O(n log(n)) + O(n)`. For large values of `n` its safe to assume that `n >> log(n) && n^2 >> n`. By this assumption we can reduce the Complexity to `O(2n^2) + O(2n)` OR `O(n^2) + O(n)` by safely removing the smaller terms and constants.
This leaves us with `O(n^2)` as the Complexity of the algorithm.

# Testing

All the `unit testing` in the project is done using `jest`
For example have a look at `client/helpers/__test__`.
To run the test simply run this command in the terminal:
```bash
yarn test
```

OR

```bash
npm run test
```
