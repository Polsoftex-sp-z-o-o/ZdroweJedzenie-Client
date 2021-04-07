# Client for Zdrowe Jedzenie Application

## Working with Spring Client

Requires Node.js, npm.

To build locally run `gradlew build`. This builds both the webapp from `src/main/frontend` and the Spring server to handle it.

To start run `gradlew bootRun`, which also builds the server if it's not already built, and rebuilds the webapp regardless.

`gradlew clean` cleans up build products.

# Working with React application
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.