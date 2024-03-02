import { orkesConductorClient, WorkflowExecutor } from "@io-orkes/conductor-javascript";
import "dotenv/config";

import { createTaskRunner } from "./workers/workerUtil.js";

const config = {
  keyId: process.env.ORKES_API_KEY_ID,
  keySecret: process.env.ORKES_API_KEY_SECRET,
  serverUrl: "https://play.orkes.io/api",
};

async function runWorkflow(client, workflowName, workflowVersion) {
  const workflowExecutor = new WorkflowExecutor(client);
  return workflowExecutor.executeWorkflow(
    {
      name: workflowName,
      version: workflowVersion,
      input: {
        depositAccountID: "1234",
        depositAmount: 10001,
      },
    },
    workflowName,
    1,
    "myRequest"
  );
}

async function main() {
  try {
    const name = "payment_shurtu_gal_3023"; // Workflow name
    const version = 1;
    if (!name || !version) {
      throw new Error("Workflow name or version not provided");
    }
    const client = await orkesConductorClient(config);
    const taskRunner = createTaskRunner(client);
    taskRunner.startPolling();
    const a = await runWorkflow(client, name, Number(version));
    taskRunner.stopPolling();

    console.log(a);
  } catch (e) {
    console.error(e);
  }
}

async function startWorkflow() {
  const client = await orkesConductorClient(config);
  const executor = new WorkflowExecutor(client);

  const workflowName = "payment_shurtu_gal_3023";
  const workflowVersion = 1;

  try {
    const executionId = await executor.startWorkflow({
      name: workflowName,
      version: Number(workflowVersion),
      input: {
        depositAccountID: "1234",
        depositAmount: 10001,
      },
    })
  
    console.log("Execution ID: ", executionId);
  } catch (e) {
    console.error(e);
  }
}

await main();
// await startWorkflow();
