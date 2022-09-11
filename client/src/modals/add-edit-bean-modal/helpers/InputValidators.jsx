import { escapeHtml } from "../../../helpers/HtmlConverter";

const checkValueIsNumber = (value) => {
  const includesForbiddenChar = ["e", "E", "+", "-"].includes(value);
  return !isNaN(value) && !includesForbiddenChar;
}

const checkGradeIsInRange = (grade) => {
  return grade >= 0.0 && grade <= 100.0;
}

const checkRoastLevelIsInRange = (number) => {
  return number >= 0.0 && number <= 10.0;
}

const checkHarvestPeriodIsInRange = (period) => {
  return period === null || escapeHtml(period).length <= 60
}

const checkAltitudeIsInRange = (altitude) => {
  return altitude === null || escapeHtml(altitude).length <= 60
}

const checkMemoIsInRange = (memo) => {
  return memo === null || escapeHtml(memo).length <= 400
}

const checkBlendBeansCountInRange = (blendBeans) => {
  return blendBeans.length > 0 && blendBeans.length < 6
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