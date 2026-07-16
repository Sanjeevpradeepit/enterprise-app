export * from './constants';
export * from './types';

export * from './network.service';
export * from './network.listener';
export * from './network.monitor';
export * from './network.queue';



// Usage
// Check Internet
// import { networkMonitor } from '@/core/network';

// const online =
//   await networkMonitor.checkConnection();
// Queue API Request
// import { networkQueue } from '@/core/network';

// networkQueue.add({
//   id: '1',
//   url: '/users',
//   method: 'POST',
//   data: {
//     name: 'John',
//   },
// });
// Retry When Online
// import {
//   networkMonitor,
//   networkQueue,
// } from '@/core/network';

// if (await networkMonitor.checkConnection()) {
//   await networkQueue.retry();
// }