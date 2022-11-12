# Pet Project: Video Chat

This application was made as a pet project to experiment with Astro and WebRTC.
The frontend was made using AstroJS for rendering, SolidJS for component behavior and TailwindCSS for styling.
The backend was made with NestJS.

For comunication I am using sockets to manage chat rooms and webrtc for handling peer to peer comunication.

## Frontend Frameworks
- AstroJS
- SolidJS
- TailwindCSS

## Backend Frameworks
- NestJS

## Comunication Frameworks
- PeerJS
- Socket.IO

## How to use

### Install:
`npm install`

OR

`yarn install`

### Run Backend:
```
  cd backend
  npm install
  npm start:dev
```

OR

```
  cd backend
  yarn install
  yarn start:dev
```

### Run Frontend:
```
  cd frontend
  npm install
  npm run dev
```

OR

```
  cd frontend
  yarn install
  yarn run dev
```

## TODO
- Video grid
- Select username
- Select avatar
- Add avatar to chat messages
- Replace sender id for username on chat messages
- Display participants list (Avatar, name and muted status)
- Display video state (muted/unmuted icon and username)
- Multi grid video display depending on number of streams available
- Chat controls (toggle mute, toggle video, leave room and audio level)
- Redesign app
