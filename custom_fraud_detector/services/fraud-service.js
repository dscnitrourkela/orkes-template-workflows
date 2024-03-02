const THRESHOLD_AMOUNT = 100 * 1000;

export const isFraudulentTxn = (__accountId, amount) => {
  amount = parseInt(amount);
  console.log("amount", amount);

  if (amount > THRESHOLD_AMOUNT) {
    return {
      result: "FAIL",
      reason: "Amount above threshold",
    };
  }
  return {
    result: "PASS",
    reason: "All good!",
  };
};