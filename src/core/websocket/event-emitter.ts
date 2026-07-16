type Listener = (payload?: any) => void;

class EventEmitter {
  private listeners = new Map<string, Set<Listener>>();

  on(event: string, callback: Listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(callback);

    return () => this.off(event, callback);
  }

  off(event: string, callback: Listener) {
    this.listeners.get(event)?.delete(callback);
  }

  emit(event: string, payload?: any) {
    this.listeners.get(event)?.forEach(cb => cb(payload));
  }

  removeAll() {
    this.listeners.clear();
  }
}

export const websocketEmitter = new EventEmitter();