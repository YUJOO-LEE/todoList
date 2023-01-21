import { worker } from './browser';
import { todoStore } from './data/service';

const initializeMockupWorker = async () => {
  await Promise.all([todoStore.init(), worker.start({ onUnhandledRequest: 'bypass' })]);
};

export default initializeMockupWorker;