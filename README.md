# Memories
![Memories](https://i.ibb.co/Z8Y0CJv/Screenshot-2020-10-30-at-11-10-04.png)

## Introduction
Memories is a simple social media application that allows users to post interesting events that happened in their lives through pictures.

## Technology Stack
* React
* Redux
* Material UI
* Authentication using Google OAuth
* Node.js
* Express
* MongoDB

## Run This App Locally

Run the below command to install the dependencies
```sh
cd client && npm install
cd ../server && npm install
```
Go inside both the *client* and *server* folders run the below command to start them both
```sh
npm start
```
Go to the *server* folder and create a *.env* file with the following keys,

| Key | Value |
| ------ | ------ |
| CONNECTION_URI | your-mongo-atlas-connection-uri |
| SECRET | any-string-here |

