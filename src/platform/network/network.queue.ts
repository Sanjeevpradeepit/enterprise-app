import { QueuedRequest } from './types';

class NetworkQueue {
  private queue: QueuedRequest[] = [];

  add(request: QueuedRequest) {
    this.queue.push(request);
  }

  getAll() {
    return this.queue;
  }

  clear() {
    this.queue = [];
  }

  async retry() {
    for (const request of this.queue) {
      console.log(
        '[Retry Request]',
        request.url,
      );

      /**
       * TODO
       * axios(request)
       */
    }

    this.clear();
  }
}

export const networkQueue =
  new NetworkQueue();