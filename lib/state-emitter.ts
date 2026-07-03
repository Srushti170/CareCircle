import { EventEmitter } from "events";

const globalWithEmitter = global as typeof globalThis & {
  stateEmitter?: EventEmitter;
};

if (!globalWithEmitter.stateEmitter) {
  globalWithEmitter.stateEmitter = new EventEmitter();
  globalWithEmitter.stateEmitter.setMaxListeners(100);
}

export const stateEmitter = globalWithEmitter.stateEmitter;
