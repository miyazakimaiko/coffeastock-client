import { escapeHtml } from "../../../helpers/HtmlConverter";
import { MAX_COUNT, MAX_LENGTH, MAX_NUMBER } from "../../../utils/Constants";

const checkValueIsNumber = (value) => {
  const includesForbiddenChar = ["e", "E", "+", "-"].includes(value);
  return !isNaN(value) && !includesForbiddenChar;
}

const checkGradeIsInRange = (grade) => {
  return grade >= 0.0 && grade <= MAX_NUMBER.BEANS_GRADE;
}

const checkRoastLevelIsInRange = (number) => {
  return number >= 0.0 && number <= MAX_NUMBER.BEANS_ROAST_LEVEL;
}

const checkHarvestPeriodIsInRange = (period) => {
  return period === null || escapeHtml(period).length <= MAX_LENGTH.BEANS_HARVEST_PERIOD
}

const checkAltitudeIsInRange = (altitude) => {
  return altitude === null || escapeHtml(altitude).length <= MAX_LENGTH.BEANS_ALTITUDE
}

const checkMemoIsInRange = (memo) => {
  return memo === null || escapeHtml(memo).length <= MAX_LENGTH.COMMON_MEMO
}

const checkBlendBeansCountInRange = (blendBeans) => {
  return blendBeans.length > 0 && blendBeans.length <= MAX_COUNT.BLEND_BEANS
}

export { 
  checkValueIsNumber,
  checkGradeIsInRange, 
  checkRoastLevelIsInRange,
  checkHarvestPeriodIsInRange,
  checkAltitudeIsInRange,
  checkMemoIsInRange,
  checkBlendBeansCountInRange,
};