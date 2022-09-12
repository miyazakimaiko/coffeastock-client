import { MAX_LENGTH, MAX_NUMBER } from "../../../utils/Constants";

const checkValueIsNumber = (value) => {
  const includesForbiddenChar = ["e", "E", "+", "-"].includes(value);
  return !isNaN(value) && !includesForbiddenChar;
}

const checkGrindSizeIsInRange = (size) => {
  return checkValueIsNumber(size) && size >= 0.0 && size <= MAX_NUMBER.RECIPES_GRIND_SIZE;
}

const checkGroundsWeightIsInRange = (weight) => {
  return checkValueIsNumber(weight) && weight >= 0.0 && weight <= MAX_NUMBER.RECIPES_GROUNDS_WEIGHT;
}

const checkWaterWeightIsInRange = (weight) => {
  return checkValueIsNumber(weight) && weight >= 0.0 && weight <= MAX_NUMBER.RECIPES_WATER_WEIGHT;
}

const checkWaterTempIsInRange = (temp, max) => {
  return checkValueIsNumber(temp) && temp >= 0.0 && temp <= max;
}

const checkYieldWeightIsInRange = (weight) => {
  return checkValueIsNumber(weight) && weight >= 0.0 && weight <= MAX_NUMBER.RECIPES_YIELD_WEIGHT;
}

const checkExtractionTimeIsInVaildForm = (string) => {
  if (string === null) {
    return true
  }
  let valid = String(string).match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);
  return valid;
}

const checkTdsIsInRange = (tds) => {
  return checkValueIsNumber(tds) && tds >= 0.0 && tds <= MAX_NUMBER.RECIPES_TDS;
}

const checkTotalRateIsInRange = (rate) => {
  return checkValueIsNumber(rate) && rate >= 0.0 && rate <= MAX_NUMBER.RECIPES_TOTAL_RATE;
}

const checkPalateRatesAreInRange = (palateRate) => {
  let inRange = true;
  Object.values(palateRate).forEach(value => {
    if (!checkValueIsNumber(value) || parseFloat(value) > MAX_NUMBER.PARATES_RATE || parseFloat(value) < 0) {
      inRange = false;
    }
  });
  return inRange;
}

const checkMemoIsInRange = (memo) => {
  if (memo === null) return true;
  
  if (memo.length > MAX_LENGTH.COMMON_MEMO) {
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