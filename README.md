# Seattle Flu Study

This is the website for [seattleflu.org](https://seattleflu.org), developed as a collaboration between the [Bedford Lab](https://bedford.io) and [Formative](https://formativeco.com).

- [Starting the server](#starting-the-server)
- [Development](#development)
  - [Routes](#routes)
  - [Views](#views)
  - [Services](#services)
  - [Contentful CMS](#contentful-cms)
    - [Content types](#content-types)
    - [Environment variables](#environment-variables)
  - [Mapbox](#mapbox)
  - [CSS](#css)
  - [Adding new React sub-apps](#adding-new-react-sub-apps)
##


## Starting the server

Make sure the dependencies are installed by running `npm install`.

Then, start the server with `npm start`.
The development server is now running at <http://localhost:3000>.


## Development

A heterogeneous software stack is used.

The web server (`app.js`) uses [Express](https://expressjs.com) for routing (under `routes/`), renders [Embedded Javascript Templates](https://ejs.co) (under `views/`), and serves static files from `public/`.

The client-side JS uses React, with separate "apps" under their own directories (`enroll/`, `current/`, …).
These are transpiled with Webpack + Babel and bootstrapped by EJS templates which contain the app's container element and a `<script>` tag to load the bundle from `/dist/${name}-bundle.js`.


### Routes

Routers live at `routes/`.
They perform minimal work, declaring `GET` endpoints at the paths provided by the middleware.
Routers also pass context to `this` for `ejs` to render in its templates, e.g. `title`.


### Views

Views live at `views/` as `.ejs` files.
These files are only loaded in the main application.
Views that require JavaScript need two things:
1. A `div` with an `id` that the JavaScript file will use to manipulate the DOM.
2. A `script` tag of type `text/javascript` that loads the desired JavaScript bundle from the `/dist` directory.


### Services

Shared services live under `services/`.
This is where we are currently defining methods for retrieving data from the Contentful SDK.
These functions can be imported either by routers or within React apps.


### Contentful CMS

We are currently using [Contentful](https://contentful.com) as our content management system (CMS).


#### Content types

When defining [content models](https://www.contentful.com/developers/docs/concepts/data-model/), we have had the best success rendering `Long text` or `Short text` fields.
This requires converting the returned Markdown text to HTML using a library such as [react-markdown](https://github.com/rexxars/react-markdown).
We do not recommend declaring fields as Rich Text because each field is stored with multiple nodes, making programmatic access more irregular and error-prone.


#### Environment variables

The following environment variables may be defined during the build and/or at runtime to override the default hardcoded values:
* `CONTENTFUL_ACCESS_TOKEN`
* `CONTENTFUL_SPACE`

Once you have been invited to the Seattle Flu Study space on Contentful, these API keys are accessible under Settings → API Keys → website-dev.

The access token and space id are not secrets as the Content Delivery API provided by Contentful is read-only and we do not have any non-public content.
This assessment is backed up by [Contentful's official position](https://www.contentfulcommunity.com/t/should-i-keep-access-tokens-secret/457/3).


### CSS

Global CSS files should be added to `public/stylesheets/` and included with a `<link>` tag in the EJS template under `views/`, e.g.

```html
<link rel="stylesheet" type="text/css" href="/stylesheets/my-component.css">
```


### Mapbox

The website includes two maps found at `/current` and `/science`.
We produce these maps within React using [react-map-gl](https://uber.github.io/react-map-gl/), a wrapper for [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/).

The `<MapboxGL>` component from `react-map-gl` takes a fairly complicated [map style object](https://docs.mapbox.com/mapbox-gl-js/style-spec/) which controls most of the map's appearance.
We store the map style object in our components' local state so it can be dynamic.
Because of its deeply nested nature, it would be easy to accidentally write code that shared object references between copies of the state.
This could lead to subtle in-place mutations which would introduced hard-to-diagnose bugs.
By using [Immutable](https://immutable-js.github.io/immutable-js/docs/#/) objects, we not only prevent this kind of bug, but we also get handy methods that make deep updates easier.


### Adding new React sub-apps

Adding new React sub-applications to the main website is a fairly involved process with many moving pieces. However, this guide should help you through, step-by-step!
1. Create a new directory tree at the top level of this repo named after the name of the new page.
   For example, if we want our new page on the website to be named `my-component`, we run

        mkdir -p my-component/src/
        cd my-component/

2. Open up `src/index.js` and add the following code:

    ```js
    import React from 'react'
    import ReactDOM from 'react-dom'
 
    const App = () => {
      return (
        <div className='template-react-app'>
          <p>
            I am a template React app.
            <br />
            Edit me at <code>./src/index.js</code>.
          </p>
        </div>
      )
    }
    export default App
    const wrapper = document.getElementById('target-dom-element')
    wrapper ? ReactDOM.render(<App />, wrapper) : false
    ```

   This is your main React component (currently named `App`).
   Feel free to import components from external files here and develop with React as normal.

   Find the following code near the bottom of your `App` React component:

    ```js
    const wrapper = document.getElementById('target-dom-element')
    ```

   Replace the element id `target-dom-element` with the name of your component.
   This id must match the id you use in the next step, or the JavaScript will not load on the web page.

3. Move back to the top-level of the repo.
   Open up `webpack.config.js` and find the `const entrypoints` declaration.
   Add a new key-value pair to it for your new React app:

    ```js
    "my-component": ['./my-component/src/index.js', ...devSource],
    ```

4. Create a new file under the `views/` directory, following the same naming convention we've employed so far.

        touch views/my-component.ejs

    Paste the following code in your newly created `ejs` file.

    ```js
        <% include ./partials/header  %>

        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4 offset-md-1">
                    <h1><%= title %></h1>
                    <div id="target-dom-element">
                        <!-- React app inserts itself here -->
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="/dist/my-component-bundle.js"></script>

        <% include ./partials/footer  %>
    ```

    There are two parts working together in this code that load your React app.
    1. `<div id="target-dom-element">` is the target element expected by your React app's `src/index.js` file, which you adjusted in the previous step. This is the element in which your app will render.
    2. The `<script>` tag near the bottom of the file specifies which JavaScript bundle will be loaded from the top-level `dist/` directory.

5. Create a new file under `routes/`, following the convention of naming the newly created file after the desired path to your new webpage.

        touch routes/my-component.js

    Paste the following code into the newly created JavaScript file:

    ```js
        var express = require('express')
        var router = express.Router()

        router.get('/', function (req, res, next) {
        res.render('my-component', { title: 'My Component Page' })
        })

        module.exports = router
    ```

    Now the `GET` endpoint is ready to serve the home page of our newly created React app.

6. Next, open up `app.js` from the current directory.
   At the top of the page, import your newly created router from step 5.

    ```js
        var myComponentRouter = require('./routes/my-component')
    ```

   After that, add a new path to your new webpage with `app.use()`.

    ```js
        app.use('/my-component', myComponentRouter)
    ```

7. You're done! From the top-level directory, run

        npm start

   and then open up <http://localhost:8080/my-component>.
   You should see the placeholder React content render.
   Now you're ready to build out the React subapp.
