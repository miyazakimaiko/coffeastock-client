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
  return period === null || escapeHtml(period).length <= MAX_LENGTH.BEANS_HARVEST_PERIOD;
}

const checkAltitudeIsInRange = (altitude) => {
  return altitude === null || escapeHtml(altitude).length <= MAX_LENGTH.BEANS_ALTITUDE;
}

const checkMemoIsInRange = (memo) => {
  return memo === null || escapeHtml(memo).length <= MAX_LENGTH.COMMON_MEMO;
}

const checkBlendBeansCountInRange = (blendBeans) => {
  return blendBeans.length > 0 && blendBeans.length <= MAX_COUNT.BEANS.BLEND;
}

const checkOriginsCountInRange = (origins) => {
  return origins.length > 0 && origins.length <= MAX_COUNT.BEANS.ORIGIN;
}

const checkFarmsCountInRange = (farms) => {
  return farms.length <= MAX_COUNT.BEANS.FARM;
}

const checkRoastersCountInRange = (roasters) => {
  return roasters.length <= MAX_COUNT.BEANS.ROASTER;
}

const checkVarietalsCountInRange = (varietals) => {
  return varietals.length <= MAX_COUNT.BEANS.VARIETY;
}

const checkProcessesCountInRange = (processes) => {
  return processes.length <= MAX_COUNT.BEANS.PROCESS;
}

const checkAromasCountInRange = (aromas) => {
  return aromas.length <= MAX_COUNT.BEANS.AROMA;
}

export { 
  checkValueIsNumber,
  checkGradeIsInRange, 
  checkRoastLevelIsInRange,
  checkHarvestPeriodIsInRange,
  checkAltitudeIsInRange,
  checkMemoIsInRange,
  checkBlendBeansCountInRange,
  checkOriginsCountInRange,
  checkFarmsCountInRange,
  checkRoastersCountInRange,
  checkVarietalsCountInRange,
  checkProcessesCountInRange,
  checkAromasCountInRange,
};