# ZdroweJedzenie-Client

## Building

Requires Node.js, npm.

To build locally run `gradlew build`. This builds both the webapp from `src/main/webapp` and the Spring server to handle it.

To start run `gradlew bootRun`, which also builds the server if it's not already built, and rebuilds the webapp regardless.

`gradlew clean` cleans up build products.