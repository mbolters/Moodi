## Overview
Moodi is a MERN stack application with user authentication that allows users to record and write journal entries for daily mood. Moods are saved and returned in data charts to review entries with a motivational quote API.

## LINK
[Click Here to try the App](https://cryptic-savannah-50890.herokuapp.com/)


### Programs Used: 

* bcryptjs: used to hash passwords before we store them in our database

* body-parser: used to parse incoming request bodies in a middleware

* concurrently: allows us to run our backend and frontend concurrently and on different ports

* express: sits on top of Node to make the routing, request handling, and responding easier to write

* is-empty: global function that will come in handy when we use validator

* jsonwebtoken: used for authorization. claims in a JWT
   are encoded as a JSON object that is used as the payload of a JSON
   Web Signature (JWS) structure or as the plaintext of a JSON Web
   Encryption (JWE) structure, enabling the claims to be digitally
   signed or integrity protected with a Message Authentication Code
   (MAC) and/or encrypted.

* mongoose: used to interact with MongoDB

* passport: used to authenticate requests, which it does through an extensible set of plugins known as strategies. You provide Passport a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails.

* passport-jwt: passport strategy for authenticating with a JSON Web Token (JWT); lets you authenticate endpoints using a JWT

* validator: used to validate inputs (e.g. check for valid email format, confirming passwords match)

* axios: promise based HTTP client for making requests to our backend

* classnames: used for conditional classes in our JSX

* jwt-decode: used to decode our jwt so we can get user data from it

* react-redux: allows us to use Redux with React

* react-router-dom: used for routing purposes

* redux: used to manage state between components (can be used with React or any other view library)

* redux-thunk: middleware for Redux that allows us to directly access the dispatch method to make asynchronous calls from our actions

***Add redux and react Chrome Extensions

#### NPM commands:

`npm init`

`npm install node.js`
*NOTE* node.js must be installed in route and client folders

`npm i bcryptjs body-parser concurrently express is-empty jsonwebtoken mongoose passport passport-jwt validator axios classnames jwt-decode react-redux react-router-dom redux redux-thunk`
***install in route and client folders

`npm i -D nodemon`

`npm i -g create-react-app`

`npm i react-datepicker` ***install into client folder
