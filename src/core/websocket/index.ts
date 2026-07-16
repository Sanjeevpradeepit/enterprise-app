export * from './constants';
export * from './types';

export * from './event-emitter';

export * from './heartbeat.service';
export * from './message.handler';
export * from './reconnect.service';

export * from './websocket.listener';
export * from './websocket.manager';
export * from './websocket.service';




// Example Usage

// Initialize once (Providers)
// useEffect(() => {
//   websocketManager.initialize(
//     'wss://api.enterprise.com/ws',
//   );
// }, []);
// Login Success
// await authService.login(dto);

// tokenService.saveAccessToken(
//   response.accessToken,
// );

// websocketManager.connect();
// Logout
// websocketManager.disconnect();

// tokenService.removeTokens();
// Send Message
// websocketManager.send(
//   'CHAT_MESSAGE',
//   {
//     roomId: 'room-1',
//     message: 'Hello',
//   },
// );
// Listen Events
// const unsubscribe =
//   websocketListener.on(
//     'CHAT_MESSAGE',
//     payload => {
//       console.log(payload);
//     },
//   );

// // cleanup
// unsubscribe();