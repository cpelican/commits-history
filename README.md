I chose the Option A (entering the key in an input) because I estimated finding out how to deploy the app with a backend would have make me not to be able to give in time the test.

I did not implement the countdown, but the polling should be working (only if the key is right). Once the user has entered the key, it should not poll if the api call has returned an error, and wait for the user to enter another key.

For css I used scss preprocessor, mainly because it allows me to nest css, which I find more readable.

Below are the todos and difficulties I could think of.

## Doubts and difficulties during the test
- [ ] The state flow seems to me too complicated and buggy.
It would have been less complicated if I had implemented the second solution with a backend proxy for the key (couldn't because of lack of time).
Or maybe it would have had more sense to divide it on 2 pages, one where the user enters the api key, the other one where we get the results. If the result is an error, then go back (couldn't because of lack of time).
- [ ] Maybe the date logic should have been better separated from the rest.
- [ ] Maybe the AdditionalInfo component could be better renamed.
- [ ] I'm more used to a class based approach, so handling the various hooks is new to me.
- [ ] I'm used to jest, don't know yet very well the react-testing library (but wanted to give it a try). Maybe the way I wrote tests is not optimal.
- [ ] At first I didn't think of using octocat and did a fetch request on the api, maybe I should have.

## TODOS
- [ ] check the 502 error is behaving as wanted and fix it if not.
- [ ] Better handle loading or divide the app in 2 pages.
- [ ] Remove the error when reloading after error.
- [ ] handle empty state and differenciate it from the loading state
- [ ] add more tests, especially the whole polling thing
- [ ] better ui for input and so
- [ ] better handle firefox and safari for input
- [ ] add pagination


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
