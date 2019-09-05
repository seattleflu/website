# Seattle Flu Study

This is the website for [seattleflu.org](https://seattleflu.org).

- [Seattle Flu Study](#seattle-flu-study)
  - [Season two / 2019–20](#season-two--2019%e2%80%9320)
    - [Starting the server](#starting-the-server)
    - [Development](#development)
      - [Structure](#structure)
  - [Season one / 2018–19](#season-one--2018%e2%80%9319)

## Season two / 2019–20

The work-in-progress website for the second study season, not yet deployed live, is on the branch `season-two/master`.

This version is being developed as a collaboration between the [Bedford Lab](https://bedford.io) and [Formative](https://formativeco.com).


### Starting the server

Make sure the dependencies are installed by running `npm run install`.

Then, start the server with `npm run start`.
The development server is now running at http://localhost:8080


### Development

The Seattle Flu Website is built using [Embedded Javascript Templates](https://ejs.co) and [Express](https://expressjs.com).


#### Structure

The main application is the Seattle Flu Study website.
It comprises multiple React applications that are added via routes and views.
These applications can be developed in isolation from the main application (i.e. website) by starting the server within each application's top-level directory.

* **Main application**

    The code for the `express` server lives at [app.js](./app.js).
    `app.js` starts the app, sets up the engine, mounts middleware to the declared routers, loads static files from provided paths, and declares error handling.

* **Routes**

    Routers live at `routes/`.
    They perform minimal work, declaring `GET` endpoints at the paths provided by the middleware.
    Routers also pass context to `this` for `ejs` to render in its templates, e.g. `title`.

* **Views**

    Views live at `views/` as `.ejs` files.
    These files are only loaded in the main application.
    Views that require JavaScript need two things:
    1. A `div` with an `id` that the JavaScript file will use to manipulate the DOM.
    2. A `script` tag of type `text/javascript` that loads the desired JavaScript bundle from the top-level directory.
        >Recall: Available static files (like JavaScript bundles) are declared by adding their paths in `app.js`.

* **React applications**

    Smaller React applications live within this repository.
    They are named after the web page they represent (e.g. `enroll`).
    They consist of an `index.html` file under `src/` which is only visible to the React application.

    >Recall: The main application instead renders a view of the React application from a bundled JavaScript file.

    * **Starting the server**

        Make sure the dependencies are installed by running `npm run install`.

        Then, start the server with `npm run start`.
        The development server is now running at http://localhost:8080

    * **Building JavaScript bundles**

        Make sure the dependencies are installed by running `npm run install`.

        Then, run webpack with `npm run build`.
        The bundled React application now lives at `dist/`.


## Season one / 2018–19

The website for the first study season, and what’s live currently, is on the branch `master`.
