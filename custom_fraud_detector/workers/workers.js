import { isFraudulentTxn } from "../services/fraud-service.js";

export const fraudCheckWorker = {
  taskDefName: "custom-fraud-detection",
  execute: async ({ inputData }) => {
    const { amount, accountId } = inputData;
    const fraudResult = isFraudulentTxn(accountId, amount);
    return {
      outputData: fraudResult,
      status: "COMPLETED",
    };
  },
  pollInterval: 100, 
  concurrency: 1, 
};