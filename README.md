## Repo with a sample how to run cypress test in github actions with minimal effort

![Node.js CI](https://github.com/lkowalczyk87/react-cypress-with-github-action/workflows/Node.js%20CI/badge.svg?branch=master)

The goal of this repository is to provide you the easiest sample on how to combine React project, Cypress e2e tests and Github Actions. 

### React

React part was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and you are probably already familiar with [CRA](https://github.com/facebook/create-react-app) but if not it's what you need to know to understand what's going on.

To start the project locally you need to do two things: 
- install dependencies 
```sh
npm ci 
```
- and run the app ;) 
```sh
npm start 
```
When you do it, this app should be available at [http://localhost:3000/](http://localhost:3000/).

### Cypress 

If you like to run tests locally first you need to start the app (how to do that is explained above) then go to e2e folder
```sh
cd e2e 
```
install dependencies
```sh
npm ci
```
and start Cypress itself by 
```sh
npx cypress run
```
if you like to run tests in headless mode, or 
```sh
npx cypress open
```
if you preffer to use Cypress app. 

### Github action

Github action can be found in a standard directory. 
```sh
root folder
├── .github
│   ├── workflows
│   │   ├── cypress.yml
...
```
It's a standard Node.js Github Action which triggers on push to the master branch or creating pull request to the master branch. <br /> The most interesting line runs e2e-ci script from package.json located in the root folder. 
```sh
- run: npm run e2e-ci
```

### e2e-ci script 
The purpose of the script below is to start React app in development mode and when it's done it runs Cypress test against it.
```sh
 "e2e-ci": "concurrently -s=first \"npx wait-on http://localhost:3000 && cd e2e && npm ci && npx cypress run --record false\" \"react-scripts start\""
```
To run two commands parallelly I choose [concurrently](https://www.npmjs.com/package/concurrently).
```sh
concurrently -k -s=first
```
I use one additional option: 
```sh
-s=first
```
to return exit code of zero or one based on the result of the first ended task (which will be the result of Cypress tests or crash of dev server). 
<br />
Tasks which are running parallelly are: 
```sh
react-scripts start
```
which if you preffer can be replaced by it's shortcut 
```sh
npm start
```
and 
```sh
npx wait-on http://localhost:3000 && cd e2e && npm ci && npx cypress run --record false
```
[Wait-on](https://www.npmjs.com/package/wait-on) basically pauses chain of commands until localhost:3000 will be available. 
 
Forward commands are quite straightforward and were already explained above. The only new thing that you can notice is record flag. 
```sh
--record false
```
 By default Cypress records test execution and saves it as .mp4 file, but there is no need to force the workflow to do that additional effort.

That's all, I hope your CI workflow will never fail. ;) 
