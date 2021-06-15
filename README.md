# Memories

![Memories](https://i.ibb.co/Z8Y0CJv/Screenshot-2020-10-30-at-11-10-04.png)

## Introduction

Memories is a simple social media application that allows users to post interesting events that happened in their lives through pictures.

## Technology Stack & Concepts

- React
- Redux
- Redux Middleware - Thunk
- Pagination - both server and client side
- Material UI
- Authentication using Google OAuth
- Node.js
- Express
- MongoDB Atlas

## Run This App Locally

Run the below command to install the dependencies

```sh
cd client && npm install
cd ../server && npm install
```

Go inside both the _client_ and _server_ folders run the below command to start them both

```sh
npm start
```

Go to the _server_ folder and create a _.env_ file with the following keys,

| Key            | Value                           |
| -------------- | ------------------------------- |
| CONNECTION_URI | your-mongo-atlas-connection-uri |
| SECRET         | any-string-here                 |

If you want to test out functionality, use the following demo credentials,

| Email         | Password |
| ------------- | -------- |
| demo@demo.com | demo123  |
