# React Server Render APP

[livedemo]

I receive this project as a design task. Through this project, I learn two important things:
 - Make the UI in the way of ReactJS
 - Server side rendering vs Client side rendering

## Basic product requirements 
Create a node.js application consisting of a single playlist module with YouTube’s public search API: https://developers.google.com/youtube/v3/docs/search

Simple playlist of finite set of videos 
 - A dropdown to choose from different artists.
 - By default the first item in the dropdown should be selected and the corresponding playlist should be rendered server side. Change in selection should trigger client side updates.
 - Design/ Presentation of the module is entirely up to you. 

### Run the App

You need Node installed globally, then simply run the following command. Then go to http://localhost:3000

```sh
$ node server.js
```

### Development
I use webpack to configure the client side bundle. You can modified the Main.js in the app directory with the following command running.

```sh
$ webpack -w
```

## Design Analysis
The design process is an trial and error. The final design is 
 - 1. The state of the app is controlled by the root app, including: 1. selected artist; 2. menu options; 3. videolist data
 - 2. The menu only maintains a private state: open or not. It has a callback function received as a prop from the root app. Once there is a change in the selected artist, it will trigger the callback of the root app to update the state as a whole.
 - 3. The list element is designed to be a pure stateless UI. It only in charge of rendering the data received as props.
 - 4. As a result, everything is resuable, composable and completed React.

Below is the draft I made when designing the app
![Design Draft](https://raw.githubusercontent.com/hkjpotato/react-server-render-app/master/draft.jpg)

## Server side rendering and client side rendering
The basic idea is that React will not re-render the same mark up with the same props on the client side. This is done by comparing checksums between the initial client render and a checksum attribute in the server-rendered markup. To do so:

 - 1. Use React.createFactory to create the mark up in the server side. And then use ReactDOMServer.renderToString to render it to html.
 - 2. On the server, make the http call to the api to get initial data, then serialise the props to JSON so they can be included as a variable in the initial HTML sent to the client. 
 
For additional material, I highly suggest the following two articles about React server side rendering
 - [Isomorphic JavaScript]
 - [How to build React apps that load quickly using server side rendering]

### Node Modules 
* [Express] - Express is used to set up a simple RESTful node server.
* [Request] - Request is used to make http calls from the server side. Server side http call is make for the initial server rendering so as to load the initial data (props) for the React UI elements.
* [Jade] - Jade is used as a template engine.
* [Webpack] - Webpack is used to configure the client side JS (bundle.js).
* [Babel] - Babel is used to transform the ES6 and JSX to normal JS. it is used as loaders for both server side rendering and webpack to configure the bundle.js file used by the client side.
* [React] - React is the core in this project. 
* [react-motion] - This great module developed by Cheng lou is the plugin I used for making the whole app animated.
* [jQuery] - For the simplicity of code writing, I use JQuery on the client side to make AJAX call to my own Node RESTful server to update data on client side.


   [Express]: <http://expressjs.com>
   [Request]: <https://github.com/request/request>
   [Jade]: <https://www.npmjs.com/package/jade>
   [Webpack]: <https://www.npmjs.com/package/webpack>
   [Babel]: <https://www.npmjs.com/package/babel>
   [React]: <https://www.npmjs.com/package/react>
   [react-motion]: <https://www.npmjs.com/package/react-motion>
   [jQuery]: <http://jquery.com>
   [livedemo]: <http://52.24.114.125:3000/>
   
   [Isomorphic JavaScript]: <http://reactjsnews.com/isomorphic-javascript-with-react-node/>
   [How to build React apps that load quickly using server side rendering]:  <https://www.terlici.com/2015/03/18/fast-react-loading-server-rendering.html>


