const checkValueIsNumber = (value) => {
  const includesForbiddenChar = ["e", "E", "+", "-"].includes(value);
  return !isNaN(value) && !includesForbiddenChar;
}

const checkGrindSizeIsInRange = (size) => {
  return checkValueIsNumber(size) && size >= 0.0 && size <= 100.0;
}

const checkGroundsWeightIsInRange = (weight) => {
  return checkValueIsNumber(weight) && weight >= 0.0 && weight <= 1000.0;
}

const checkWaterWeightIsInRange = (weight) => {
  return checkValueIsNumber(weight) && weight >= 0.0 && weight <= 10000.0;
}

const checkWaterTempIsInRange = (temp) => {
  return checkValueIsNumber(temp) && temp >= 0.0 && temp <= 212.0;
}

const checkYieldWeightIsInRange = (weight) => {
  return checkValueIsNumber(weight) && weight >= 0.0 && weight <= 10000.0;
}

const checkExtractionTimeIsInVaildForm = (string) => {
  if (string === null) {
    return true
  }
  let valid = String(string).match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);
  return valid;
}

const checkTdsIsInRange = (tds) => {
  return checkValueIsNumber(tds) && tds >= 0.0 && tds <= 20.0;
}

const checkTotalRateIsInRange = (rate) => {
  return checkValueIsNumber(rate) && rate >= 0.0 && rate <= 100.0;
}

const checkPalateRatesAreInRange = (palateRate) => {
  let inRange = true;
  Object.values(palateRate).forEach(value => {
    if (!checkValueIsNumber(value) || parseFloat(value) > 10 || parseFloat(value) < 0) {
      inRange = false;
    }
  });
  return inRange;
}

const checkMemoIsInRange = (memo) => {
  if (memo === null) return true;
  
  if (memo.length > 400) {
    return false;
  }
  return true;
}

export {
  checkValueIsNumber,
  checkGrindSizeIsInRange,
  checkGroundsWeightIsInRange,
  checkWaterWeightIsInRange,
  checkWaterTempIsInRange,
  checkYieldWeightIsInRange,
  checkExtractionTimeIsInVaildForm,
  checkTdsIsInRange,
  checkTotalRateIsInRange,
  checkPalateRatesAreInRange,
  checkMemoIsInRange
}