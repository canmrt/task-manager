# Development

This document describes the implementation details for the task manager application defined below.

- Checked assignment decription and analyze requirements (see Assignment below)
- Created my own `gulpfile.js`, instead of using something like [yeoman](http://yeoman.io/)
  - Choose gulp over grunt, because memory streams are faster
  - I want to setup my own development enviroment 
  - I want to build my own toolchain with *really needed* dependencies. I have to check each tool for MIT licence.
  - I want to autoprefix generatd CSS code for required browsers.
  - I want to compress HTML templates into a single template cache file.
  - I want to have a "component" based [project structure](https://scotch.io/tutorials/angularjs-best-practices-directory-structure).
    - `/src` : contains ES6, Less and HTML files
    - `/tmp` : contains ES5 and CSS files, will use `gulp watch` on this folder during development 
    - `/dist`: contains compressed JS, CSS and index.html, used for distribution
  - Do not need Karma and Protractor, because the application will be pretty small (1 Component, 1 Service)
- I will use `Angular 1.4.x`
  - I want to use `angular-route` for routing and filtering tasks. Simple router but it is enough for the assignment.
  - I will use  `Firebase` in combination with `AngularFire`, because i want to use the synchronization feature.
- Choose ES6 + Babel as JS pre-porcessor
  - I want to use ES6 `import` and `export` statements to modularize my code.
- I added `Less` as CSS pre-processor 
  - I want to use nested syntax to group component style and variables.
- Application archtecture
  - There is a single source of tasks in `Firebase`. I want to synchronize the list between all clients.
  - Angular-App will connect to `/tasks` endpoint and use `$firebaseArray` for CRUD operations, this will be encapsulated in a service.
  - Angular-App will use 4 path variables for one main controller
    - `/#completed` , `/#inprogress`, `/#waiting` for filtering, any other path will show unfiltered list.

# Assignment

## User stories

- [ok] As a user i want to have a "task manager"
- [ok] As a user i want to create a task with default state "waiting"
- [ok] As a user i want to remove a task
- [ok] As a user i want to set my task state to one of "waiting", "in progress", "completed"
- [ok] As a user i want to save my tasks (persistance)
- [ok] As a user i want to filter my tasks by using routing
- [ok] As a developer i want to have a development environment (develop and deploy)
- [ok] As a developer i want to have a build process to deliver the app 

## Conditions

- Use any open source libraries and technologies for implementation
- For storing data use one of the following technologies
  - Firebase
  - DataSync
  - LocalStorage
- UI/UX does not matter.
- Following browsers must be supported
  - Chrome, Opera, Firefox (last 2 versions)
  - Safari (last version)
  - IE (11, Edge)

## Tasks

- Design an app architecure for "task-manager" 
- Implement an app, that fulfills conditions and user stories
- Setup development environment and build process

## Deliverables

- Link to a github repository
- README file, which explains technology stack decisions

