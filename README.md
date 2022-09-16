## Difficulties during the test
- [ ] I don't like the way I organized components especially the AdditionalInfo one, and also how the date logic is mixed with some other logic. Would have liked to separate it better.
- [ ] for a while I tried to use env variables without success (then to realize it's not a suitable solution). I wonder why I can't see the env in the react app. It seems there might be outhere a bug.
- [ ] I'm more used to a class based approach, so handling the useEffect thing is new to me
- [ ] I'm used to jest, don't know yet very well the react-testing library. I find a bit strange the fact there is no shallow render.

## TODOS
- [ ] handle loading only the first time the api call is made
- [ ] more tests, especially the whole polling thing

## Create React App readme

This directory is a brief example of a [Create React App](https://github.com/facebook/create-react-app) site that can be deployed to Vercel with zero configuration.

## Deploy Your Own

Deploy your own Create React App project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/create-react-app&template=create-react-app)

_Live Example: https://create-react-template.vercel.app/_

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.
