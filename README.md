# Semana OmniStack 11 - Be The Hero

## About

This repository is a slightly modified version of what was presented during the [Semana OmniStack 11](https://rocketseat.com.br/week/inscricao/11.0).
The main difference is that I'm using TypeScript instead of JavaScript. I've also added some development tools: ESLint, Prettier and Husky.

Technologies used:

- TypeScript
- Node.js
- Express
- React
- React Native
- Jest

## Next steps:

- Prepare a build script for the server
- Deploy the server
- Deploy the web application

## Instructions

### Server

Running the server:

```sh
cd server
npm i
npx knex migrate:latest
npm run dev
```

### Web application (www)

Running the React app:

```sh
cd www
npm i
npm start
```

### Mobile application

Running the React Native app:

```sh
npm install -g expo-cli
cd mobile
npm i
expo start
```
