# Memories

![Screenshot from 2021-06-16 15-54-44](https://user-images.githubusercontent.com/44138832/122203212-71e56f80-cebb-11eb-893d-ef5ec77e81d8.png)
![Screenshot from 2021-06-16 15-55-39](https://user-images.githubusercontent.com/44138832/122203222-7447c980-cebb-11eb-9453-3f27c7b9baae.png)
![Screenshot from 2021-06-16 15-56-12](https://user-images.githubusercontent.com/44138832/122203231-76118d00-cebb-11eb-9d3f-8530d0285cf5.png)

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
