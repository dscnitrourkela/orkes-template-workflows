import { TaskManager } from "@io-orkes/conductor-javascript";
import { fraudCheckWorker } from "./workers.js";

export function createTaskRunner(conductorClient) {
  const taskRunner = new TaskManager(conductorClient, [fraudCheckWorker], {
    logger: console,
    options: { pollInterval: 100, concurrency: 1 },
  });
  return taskRunner;
}